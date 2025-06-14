def display_grid(grid):
    for row in grid:
        print(' '.join(str(cell) for cell in row))


def rotate_boat(boat):
    return [list(reversed(col)) for col in zip(*boat)]


def isplacable(boat, grid):
    try:
        for i in range(len(boat)):
            for j in range(len(boat[i])):
                if boat[i][j] == 1 and type(grid[i][j]) != int:
                    return False
        return True
    except:
        return False


grid = [[0, 0, "X"],
        [0, 0, "X"],
        ["X", 0, "X"]]

boat = [
    [1, 1],
    [1, 1],
    [0, 1]
]


print(isplacable(boat, grid))
display_grid(grid)


boat = rotate_boat(boat)
print(isplacable(boat, grid))
display_grid(grid)
