# %%
import numpy as np
from opensimplex import OpenSimplex

import geom.data as dat
import geom.ops as ops

import geom_cairo as ctx
import cairo

canvas_width, canvas_height = ctx.setup_dpi(
    [8.5, 11], ppi=100, clear_color=[0, 0, 0], alias=cairo.Antialias.BEST
)

seed = np.random.randint(0, 1000000)
simplex = OpenSimplex(seed=seed)

# === Parameters ========================
TARGET_ROW_COUNT = 18
VERTICAL_NOISE_SCALE = 2.0
VERTICAL_MIN_SPACING = 0.1

TARGET_POINT_COUNT = 96
HORIZONTAL_NOISE_SCALE = 0.5
HORIZONTAL_MIN_SPACING = 0.02

ROW_NOISE_SCALE = 2.0
ROW_NOISE_AMPLITUDE = 0.03  # % of canvas height
# =======================================


def noise_linspace(
    target_count, noise_scale, noise_offset, min_spacing, final_range
):
    current_pos = 0
    positions = [current_pos]
    for i in range(target_count - 1):
        # Get a noise value between 0 and 1 (abs of -1 to 1)
        noise = abs(simplex.noise2(i * noise_scale, noise_offset))
        current_pos += noise + min_spacing
        positions.append(current_pos)

    # scale to final range
    positions = np.array(positions)
    positions = (positions / positions[-1]) * final_range

    return positions


# Generate vertical line positions
y_positions = noise_linspace(
    TARGET_ROW_COUNT,
    VERTICAL_NOISE_SCALE,
    0,
    VERTICAL_MIN_SPACING,
    canvas_height * 1.2,
)
y_positions = y_positions - 1.0

# Generate points for each row
row_points = []
row_lines = []
for y in y_positions:
    # Generate x positions for each row
    x_positions = noise_linspace(
        TARGET_POINT_COUNT,
        HORIZONTAL_NOISE_SCALE,
        y,
        HORIZONTAL_MIN_SPACING,
        canvas_width * 1.2,
    )
    x_positions = x_positions - 1.0

    # Add vertical noise to each point in the row
    row = []
    for x in x_positions:
        # Get noise value between -1 and 1 for this x,y coordinate
        noise = simplex.noise2(x / ROW_NOISE_SCALE, y / ROW_NOISE_SCALE)
        # Scale noise and add to base y position (relative to canvas height)
        noisy_y = y + (noise * ROW_NOISE_AMPLITUDE * canvas_height)
        row.append([float(x), float(noisy_y)])

    row_points.append(row)
    row_lines.append(dat.Polyline(row))

# Create lines between adjacent rows
lines = []
for i in range(len(row_points) - 1):
    current_row = row_points[i]
    next_row = row_points[i + 1]

    # Connect each point in current row to corresponding point in next row
    for j, point in enumerate(current_row):
        # Only connect if there's a matching point in next row
        if j < len(next_row):
            lines.append(dat.Line(point, next_row[j]))

# Draw points and lines
ctx.draw(row_lines, attribs={ctx.STROKE: [0.3, 0.2, 1.0], ctx.LINE_WIDTH: 2.0})
ctx.draw(lines, attribs={ctx.STROKE: [0, 0, 1], ctx.LINE_WIDTH: 1.5})
# ctx.draw(row_points, attribs={ctx.POINT_SIZE: 4.0, ctx.FILL: [1, 1, 1]})
ctx.display()
