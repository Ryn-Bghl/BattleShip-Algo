# BattleShip Engine Theme

<https://tweakcn.com/editor/theme>

## Preview

![BattleShip Engine Theme](./Capture%20d'écran%202025-06-15%20185725.png)

## Comment représenter les bateaux ?

Les bateaux sont :

``` python
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
```

## Comment représenter la grille ?

Les grilles sont :

``` python
0 0 0
0 X 0
0 0 0

0 0 0
0 0 0
0 0 0
```

## Avec les bateaux simples et les grilles simples

### GRILLE 3x3

``` python
0 0 0
0 0 0
0 0 0
```

### BATEAU 1x3

``` python
1 1 1
```

### ==>

``` python
0 0 0
0 0 0
0 0 0

1 1 0
0 0 0
0 0 0

1 2 1
0 0 0
0 0 0

...

2 3 2
3 4 3
2 3 2
```

On peut aussi

### GRILLE 3x3 en rotation 0° + 90° + 180° + 270°

## Comment effectuer une rotation dans une matrice

```python
def rotate_90_clockwise(matrix):
    return [list(reversed(col)) for col in zip(*matrix)]
```

## Exemple

```python
matrice = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1]
]

matrice_rotated = rotate_90_clockwise(matrice)
for row in matrice_rotated:
    print(row)
```

## TOUT SERA DES MATRICES

Les bateaux sont des matrices

Exemple:

``` python
1 1 0
0 1 1
```

`[[1, 1, 0], [0, 1, 1]]`

Les grilles sont des matrices

Exemple:

``` python
0 0 0
0 X 0
0 0 0
```

`[[0, 0, 0], [0, 'X', 0], [0, 0, 0]]`

## PSEUDO CODE

1. Créer une grille vide de n x n

2. Créer les bateaux

3. Créer une fonction qui vérifie si le bateau peut être placé dans la grille

4. Créer une fonction qui place le bateau dans la grille

   * Arguments :
     * Le bateau `[[], [], []]`
     * La grille `[[], [], []]`
     * La position de départ `(x, y)`

5. Créer une fonction qui rotationne la grille de 90°

6. Créer une fonction qui affiche la grille

7. Les cases avec le plus de cases adjacentes sont les plus favorables
