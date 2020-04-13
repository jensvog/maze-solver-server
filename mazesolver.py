import base64
import png
import astar

robot_radius = 1
threshold = 30

def generate_obstacles(picture)
    png_reader = png.Reader(bytes=picture)
    width, height, values, info = png_reader.read_flat()
    ox, oy = [], []

    for i in range(0, width * height * 3, 3):
        if (values[i] < threshold and 
           values[i+1] < threshold and 
           values[i+2] < threshold):
            normed = i / 3
            oy.append(normed / width)
            ox.append(normed % width)

    return ox, oy

def solve_maze(picture_b64, start, goal):
    picture = base64.b64decode(picture_b64)
    ox, oy = generate_obstacles(picture)
    sx = start[0]
    sy = start[1]
    gx = goal[0]
    gy = goal[1]
    grid_size = 10

    astar_planner = a_star.AStarPlanner(ox, oy, grid_size, robot_radius)
    rx, ry = astar_planner.planning(sx, sy, gx, gy)

    return rx, ry