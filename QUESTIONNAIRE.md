# 01 - que pouvez-vous dire sur l'évolution de javascript ? Comment a-t'il changé beaucoup de choses ? Qu'en pensez-vous ?

Le JavaScript a connu une évolution rapide avec la nouvelle version sortie en 2015 (ECMAScript). Node.js a permis la conception d'une application entièrement en JavaScript, ce qui facilite énormément les choses, surtout si l'on utilise TypeScript par exemple pour réutiliser des types.
Nous avons à notre disposition une multitude de bibliothèques qui nous permettent d'avancer rapidement sur certains points, en veillant à ce que la bibliothèque est fiable et encore maintenue. L'apparition de nouveaux frameworks front-end comme React, Vue ou Angular facilite le développement du front-end, tandis qu'Express ou le nouveau framework populaire Adonis rendent le développement web en JavaScript encore plus simple.

# 02 - Selon vous, quelles bonne pratiques de développement sont attendues de la part d'un professionnel ?

Pour moi les bonnes pratiques de dévelopmment sont : 
  - écrire du code simple avec des noms de variables et de fonctions qui sont faciles à comprendre pour aider le lecteur à rapidement lire et comprendre le code
  - créer de petites fonctions simples qui permettent de mieux appréhender le code, facilitent les tests par segments et permettent de corriger rapidement un problème
  - utiliser un outil d'analyse de code comme SonarQube pour écrire un code plus robuste et maintenable
  - écrire des commentaires si nécessaire
  - écrire des tests
  - contrôle de version

# 03 - En quoi la veille technique est importante ?

La veille technique nous permet de nous amméliorer au quotidient, car le monde du code évolue très rapidement et il est important de prendre en compte les nouveautés et de les appliquer pour pouvoir avoir un code plus robuste, gagner du temps et amméliorer nos compétences.

# 04 - Pouvez-vous me citer des sources d'informations relatives à la cyber sécurité ?

La seule source que je connais est ANSSI (https://cyber.gouv.fr/)

# 05 - Pouvez-vous me décrire le principe d'une injection SQL ?

Le principe d'une injection SQL est d'éxécuter une requête différente par rapport à la reqûete initiale.

# 06 - Décriver ce que l'on peut mettre en place pour s'en prémunir.

Lorsqu'on développe une application web, il y a une règle à respecter c'est de ne jamais faire confiance aux données provenant de l'extérieur. Pour éviter les injections sql, il faut éviter la concaténation et utiliser des requêtes préparéés.

# 07 - Que peut-on mettre en place dans une application afin de limiter l'accès à certaines données / actions ?

Nous pouvons mettre en place un système de rôle (invité, user, admin), mettre en place une double authentification pour exécuter certaines actions et chiffrer les données sensibles.

# 08 - Plus généralement, que pouvez-vous me dire sur les besoin en sécurité d'une application ?

Les besoins en sécurité d'une application incluent : 
- la confidentialité des données
- l'intégrité des données
- la disponiblité
- l'authentification

# 09 - Que pouvez-vous me dire sur l'intérêt des tests ?

Les tests vont permettre :
- de s'assurer que le code qu'on écrit est fiable
- de nous faire gagner du temps
- d'éviter des futurs problèmes en production par exemple
- de s'assurer que le code principal continue de fonctionner correctement après des modifications

# 10 - Pouvez-vous me citer quelques types de tests et leur destination ?

- Tests unitaires : pour permettre de tester les fonctions
- Tests fonctionnels : pour permettre de tester un ensemble de fonctionnalités au point de vue de l'utilisateur
- Tests de performance : l'application
- Tests drivent developpement : l'application

# 11 - Que pouvez-vous dire sur le développement Orienté objet et fonctionnel ?

Je pense que le développement orientée object facilite la modélisation du monde réel et rend le code plus compréhensible mais par contre le développement fonctionnel est pratique pour créer des parties de code réutilisable et nous pouvons facilement tester ces fonctions.

