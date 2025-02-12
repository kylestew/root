# %%
import numpy as np
from math import sin, cos, pi
from random import uniform, random, choices

import geom.data as dat
import geom.ops as ops

from nil.solar_yiwenl import get_random_palette, get_color_palette
import colorsys

# gather colors and convert to HSV
# palette = get_random_palette()
palette = get_color_palette(46)
colors = [
    colorsys.rgb_to_hsv(r / 255, g / 255, b / 255)
    for r, g, b in [rgb_val["value"] for rgb_val in palette["colors"]]
]
BG_COLOR = list(colors[0])
colors = colors[1:]


PARTICLE_COUNT = 10000
BASE_RADIUS = 2.0
RADIUS_VARIANCE = 0.04
BASE_ANGULAR_SPEED = 0.01
ANGULAR_SPEED_VARIANCE = 0.006
SPARK_PROBABILITY = 0.01

import geom_cairo as ctx

width, height = ctx.setup_dpi(size=[5.4, 9.6], ppi=200, clear_color=BG_COLOR)

# Initialize particles
# Each particle has: [radius, current_angle, angular_velocity, is_spark, position_x, position_y, velocity_x, velocity_y, hue, saturation, brightness, alpha]
particles = np.zeros((PARTICLE_COUNT, 12))

# Set initial radius and angle for each particle
particles[:, 0] = BASE_RADIUS + np.random.normal(
    0, RADIUS_VARIANCE, PARTICLE_COUNT
)
particles[:, 1] = np.random.uniform(0, 2 * pi, PARTICLE_COUNT)
particles[:, 2] = BASE_ANGULAR_SPEED + np.random.normal(
    0, ANGULAR_SPEED_VARIANCE, PARTICLE_COUNT
)

# Assign initial colors
for i in range(PARTICLE_COUNT):
    # Get random HSV color from colors list
    color = list(choices(colors)[0])

    # Add alpha channel
    color.append(0.2)

    particles[i, 8:12] = color


def update_particles(particles):
    """
    particles is a NumPy array with columns:
      0: radius (distance from center)
      1: angle
      2: angular_velocity
      3: type flag (0 = normal particle, 1 = spark)
      4: position_x
      5: position_y
      6: velocity_x
      7: velocity_y
    """
    # 1) Regular particles (type=0) rotate by their individual angular_velocity
    mask_regular = particles[:, 3] == 0
    particles[mask_regular, 1] += particles[
        mask_regular, 2
    ]  # increment angles using individual velocities

    # 2) Sparks (type=1) move based on their current velocities
    mask_sparks = particles[:, 3] == 1
    # position_x += velocity_x
    particles[mask_sparks, 4] += particles[mask_sparks, 6]
    # position_y += velocity_y
    particles[mask_sparks, 5] += particles[mask_sparks, 7]
    # apply some drag to velocities
    particles[mask_sparks, 6] *= 0.99
    particles[mask_sparks, 7] *= 0.99

    # 3) Check for new sparks
    potential_sparks = (
        np.random.random(PARTICLE_COUNT) < SPARK_PROBABILITY
    ) & (particles[:, 3] == 0)
    if np.any(potential_sparks):
        # Mark these as sparks
        particles[potential_sparks, 3] = 1

        # Read their angles and radii
        angles = particles[potential_sparks, 1]
        radii = particles[potential_sparks, 0]

        # Set initial (x, y) based on current angle & radius
        particles[potential_sparks, 4] = np.cos(angles) * radii  # position_x
        particles[potential_sparks, 5] = np.sin(angles) * radii  # position_y

        # ----------------------
        #   EJECTION VELOCITY
        # ----------------------

        # A small outward radial speed
        base_speed = 1.0
        ejection_angles = angles

        # 1) Radial component: speed outward in "ejection_angles" direction
        v_rad_x = base_speed * np.cos(ejection_angles)
        v_rad_y = base_speed * np.sin(ejection_angles)

        # 2) Tangential speed from wheel's rotation:
        #    v_tangential = radius * angular_speed
        #    direction is perpendicular to radial direction of 'angles'
        tangential_speed = particles[potential_sparks, 2] * radii * base_speed
        v_tan_x = -tangential_speed * np.sin(angles)
        v_tan_y = tangential_speed * np.cos(angles)

        # Combine them
        # vx = v_rad_x + v_tan_x
        # vy = v_rad_y + v_tan_y
        vx = v_tan_x
        vy = v_tan_y

        # Assign to particles
        particles[potential_sparks, 6] = vx  # velocity_x
        particles[potential_sparks, 7] = vy  # velocity_y


def draw_frame():
    # convert particle data to points
    points = []
    colors = []

    # rotating particles
    mask = particles[:, 3] == 0
    angles = particles[mask, 1]
    radii = particles[mask, 0]
    x = np.cos(angles) * radii + width / 2
    y = np.sin(angles) * radii + height / 2
    points.extend(zip(x, y))
    colors.extend(particles[mask, 8:12])

    # sparks
    mask = particles[:, 3] == 1
    if np.any(mask):
        spark_x = particles[mask, 4] + width / 2
        spark_y = particles[mask, 5] + height / 2
        points.extend(zip(spark_x, spark_y))
        colors.extend(particles[mask, 8:12])

    # Draw all points with their individual colors
    for pt, col in zip(points, colors):
        ctx.draw(
            [pt], attribs={ctx.STROKE: col, ctx.POINT_SIZE: 0.3}
        )  # Increased point size


for _ in range(2000):
    update_particles(particles)
    draw_frame()

ctx.display()
