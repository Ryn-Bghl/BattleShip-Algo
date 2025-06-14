# Comment representer les bateau ?

les bateau sont :

1 1 0
0 1 1
0 0 0

1 1 0
1 1 0
0 1 0

1 1 1
0 0 0
0 0 0

1 1 0
0 0 0
0 0 0

1 0 0
0 0 0
0 0 0

# Comment representer la grille ?

les grilles sont :

0 0 0
0 X 0
0 0 0

0 0 0
0 0 0
0 0 0

# Avec les bateau simples et les grilles simple

GRILLE 3X3

0 0 0
0 0 0
0 0 0

BATEAU 1X3

1 1 1

==>

0 0 0
0 0 0
0 0 0

1 1 0
0 0 0
0 0 0

1 2 1
0 0 0
0 0 0

.
.
.

2 3 2
3 4 3
2 3 2

On peut aussi

GRILLE 3X3 en rotation 0° + 90° + 180° + 270°

# Comment effectuer une rotation dans une matrix

def rotate_90_clockwise(matrix):
    return [list(reversed(col)) for col in zip(*matrix)]

# Exemple
matrice = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1]
]

matrice_rotated = rotate_90_clockwise(matrice)
for row in matrice_rotated:
    print(row)

# TOUT SERA DES MATRICES !

les bateaux sont des matrices

exemple:

1 1 0
0 1 1
0 0 0

[[1, 1, 0], [0, 1, 1]]

les grilles sont des matrices

exemple:

0 0 0
0 X 0
0 0 0

[[0, 0, 0], [0, X, 0], [0, 0, 0]]

# PSEUDO CODE

# 1. creer une grille vide de n x n

# 2. creer les bateaux

# 3. creer une fonction qui verifie si le bateau peut etre place dans la grille

# 4. creer une fonction qui place le bateau dans la grille

## Argument : 

Le bateau [[], [], []]

La grille [[], [], []]

La position de départ (x, y)

# 5. creer une fonction qui rotationne la grille de 90°

# 6. creer une fonction qui affiche la grille

