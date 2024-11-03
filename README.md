# Examen-Spe-Dev-Web-1-Cyril-BARTZ

# Projet Authentification

Voici quelques instructions pour vous aider à utiliser notre projet.

## Installer les dépendances

```shell
npm i
```

## Lancer le projet 

```shell
npm run dev
```

## Lancer les tests

```shell
npm run test
```

## Sujet technique

Pour permettre aux membres de l'association de modifier les informations des pays, j'ai ajouté une propriété roles à l'objet user, qui peut contenir les valeurs USER, ASSOCIATION et ADMIN. Ensuite, j'ai décidé de créer un dossier helper afin d'écrire des fonctions réutilisables dans tout le projet et de séparer la logique au sein des routeurs. Pour le rendu des versions FULL, NORMAL et SHORT, j'ai mis en place une fonction qui prend en paramètre le type et renvoie les informations appropriées à l'aide d'un switch. La route accepte un paramètre de requête contenant l'ID du pays et le type. En ce qui concerne les tests, j'ai choisi d'utiliser supertest et jest. J'ai réalisé des tests unitaires sur le helper countries et j'ai testé la route qui renvoie différentes informations du pays en fonction du type.
