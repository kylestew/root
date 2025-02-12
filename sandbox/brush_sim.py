# %%
import random
import numpy as np
from dataclasses import dataclass


@dataclass
class Bristle:
    """Individual bristle with its own properties and state"""

    # Position relative to brush center (polar coordinates)
    r: float  # Distance from center
    theta: float  # Angle from center
    # Current state
    paint: float  # Current paint load (0.0 to 1.0)
    x_offset: float  # Current x displacement from rest position
    y_offset: float  # Current y displacement from rest position


class Brush:
    def __init__(
        self, size=10, bristle_count=100, softness=0.5, paint_capacity=1.0
    ):
        """
        Initialize a brush with individual bristles

        Args:
            size (int): The size of the brush in pixels
            bristle_count (int): Number of bristles in the brush
            softness (float): How soft the brush is (0.0 to 1.0)
            paint_capacity (float): How much paint the brush can hold (0.0 to 1.0)
        """
        self.size = size
        self.bristle_count = bristle_count
        self.softness = max(0.0, min(1.0, softness))
        self.paint_capacity = paint_capacity

        # Initialize bristles in a radial pattern
        # TODO: Make bristle layout more natural (randomize)
        self.bristles = []
        for i in range(bristle_count):
            # Create concentric circles of bristles
            layer = i / bristle_count
            r = size * np.sqrt(layer)  # Square root for more even distribution
            theta = i * 137.508  # Golden angle for natural distribution

            bristle = Bristle(
                r=r,
                theta=np.radians(theta),
                paint=0.0,
                x_offset=0.0,
                y_offset=0.0,
            )
            self.bristles.append(bristle)

    def get_bristle_positions(self, pressure, dx=0, dy=0):
        """
        Calculate current positions of all bristles based on pressure and movement

        Args:
            pressure (float): Current pressure (0.0 to 1.0)
            dx (float): X-axis movement since last position
            dy (float): Y-axis movement since last position

        Returns:
            list of tuples: (x, y) positions for each bristle
        """
        positions = []

        # Movement affects bristle spread and bend
        movement_magnitude = np.sqrt(dx * dx + dy * dy)
        movement_angle = np.arctan2(dy, dx) if movement_magnitude > 0 else 0

        for bristle in self.bristles:
            # Base position (polar to cartesian)
            base_x = bristle.r * np.cos(bristle.theta)
            base_y = bristle.r * np.sin(bristle.theta)

            # Add pressure-based spread (higher pressure = more spread)
            spread = pressure * self.softness * bristle.r * 0.2

            # Add movement-based bend
            bend_factor = movement_magnitude * self.softness * 2.0
            bristle.x_offset = -dx * bend_factor
            bristle.y_offset = -dy * bend_factor

            # Final position
            x = base_x + bristle.x_offset + random.gauss(0, spread)
            y = base_y + bristle.y_offset + random.gauss(0, spread)

            positions.append((x, y))

        return positions

    def stroke(self, pressure, dx=0, dy=0):
        """
        Simulate a brush stroke, returning each bristle's position and paint application

        Args:
            pressure (float): Pressure applied (0.0 to 1.0)
            dx (float): X-axis movement since last position
            dy (float): Y-axis movement since last position

        Returns:
            list of tuples: (x, y, paint_amount) for each bristle
        """
        positions = self.get_bristle_positions(pressure, dx, dy)
        stroke_data = []

        for bristle, pos in zip(self.bristles, positions):
            # Calculate paint flow for this bristle
            base_flow = pressure * bristle.paint * (1.0 - self.softness * 0.5)
            # Add some randomness to paint flow
            flow_variation = random.uniform(0.8, 1.2)
            paint_amount = base_flow * flow_variation

            # Update bristle's paint level
            paint_used = paint_amount * 0.1
            bristle.paint = max(0.0, bristle.paint - paint_used)

            stroke_data.append((pos[0], pos[1], paint_amount))

        return stroke_data

    def reload_paint(self):
        """Reload all bristles with fresh paint between 50-100% capacity"""
        for bristle in self.bristles:
            bristle.paint = random.uniform(
                self.paint_capacity * 0.5, self.paint_capacity
            )


# Create a brush
brush = Brush(size=15, bristle_count=64, softness=0.7)
# Dip it in paint
brush.reload_paint()


import geom.data as dat
import geom_cairo as ctx
import cairo

canvas_width, canvas_height = ctx.setup_dpi(
    [400, 400], ppi=1, clear_color=[0, 0, 0], alias=cairo.Antialias.BEST
)

# Generate 20 stroke positions along a path
x = 200
y = 200
stroke_points = []

for i in range(200):
    dx = (-2 + random.uniform(-1, 1)) * 0.3
    dy = (-1 + random.uniform(-1, 1)) * 0.3

    # Vary pressure sinusoidally through the stroke
    progress = i / 200
    pressure = (
        0.8
        * (1 + np.sin(progress * 2 * np.pi + random.uniform(-0.2, 0.2)))
        * (0.7 + random.uniform(-0.1, 0.1))
    )

    stroke_data = brush.stroke(pressure=pressure, dx=dx, dy=dy)

    # Update position
    x += dx
    y += dy

    # Store stroke data
    stroke_points.extend(
        [(x + bx, y + by, paint) for bx, by, paint in stroke_data]
    )

# Draw all stroke points
for x, y, paint in stroke_points:
    ctx.draw(
        dat.Point([x, y]), attribs={ctx.POINT_SIZE: 2, ctx.FILL: [1, 0, 1, 0.2]}
    )


ctx.display()
