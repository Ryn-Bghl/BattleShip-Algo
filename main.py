from prettytable import PrettyTable


def display_grid(grid):
    table = PrettyTable()
    table.hrules = 1
    table.vrules = 1
    table.header = False

    for row in grid:
        table.add_row([str(cell).ljust(2) for cell in row])

    print(table, end="\n\n")


def rotate_boat(boat):
    return [list(reversed(col)) for col in zip(*boat)]


def get_stats(boat, grid):
    for n in range(4):
        for i in range(len(grid) - len(boat) + 1):
            for j in range(len(grid[i]) - len(boat[0]) + 1):
                for k in range(len(boat)):
                    for l in range(len(boat[k])):
                        grid[i + k][j + l] += boat[k][l]
        boat = rotate_boat(boat)
    return grid


grid = [[0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]]

boat = [[0, 1, 0],
        [1, 1, 1],
        [0, 1, 0]]

grid = get_stats(boat, grid)
display_grid(boat)
display_grid(grid)
