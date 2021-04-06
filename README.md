

# justify-api
***

## Description
***
Version de déploiement d'une REST API destinée à justifier un texte envoyé par requête POST. Cette API comprend aussi un système de limitation de requêtes en contrôlant le nombre de mots traités par le server. De plus, elle dispose d'un système d'authentification via JWT et dispose d'un endpoint permettant la gestion des différents utilisateurs.
Afin d'accéder à une version utilisable localement, veuillez utiliser le code au premier commit.

## Interaction
***
Ceci étant le code de l'API déployée, afin d'intéragir avec celle-ci il faut envoyer des requêtes HTTP à l'URL de déploiement en utilisant les trois endpoints définis ci-dessous : 
- Le premier endpoint : `/api/users` permet de créer un utilisateur à l'aide d'une requête POST, puis, après authentification, de récupérer la liste des utilisateurs inscrits avec une requête GET, de consulter (GET sur `/api/users/:userId`) ou modifier (PATCH sur `/api/users/:userID`) ses propres informations et de supprimer un utilisateur autre que soi avec la requête DELETE.
- Le deuxième endpoint : une requete POST sur `/api/token` permet de générer un token unique via JWT afin de pouvoir accéder aux services de l'API. Il est aussi possible de renouveler son token à l'aide d'une requête POST sur `/api/token/refresh`.
- Le dernier endpoint permet donc la justification d'un texte envoyé à l'aide d'une requête POST sur `/api/justify`. Dans le cadre de l'exercice, ceci est limité à 80000 mots par 24h.

## Exemple de résultat
***
#### Entrée
Longtemps, je me suis couché de bonne heure. Parfois, à peine ma bougie éteinte, mes yeux se fermaient si vite que je n’avais pas le temps de me dire: «Je m’endors.» Et, une demi-heure après, la pensée qu’il était temps de chercher le sommeil m’éveillait; je voulais poser le volume que je croyais avoir dans les mains et souffler ma lumière; je n’avais pas cessé en dormant de faire des réflexions sur ce que je venais de lire, mais ces réflexions avaient pris un tour un peu particulier; il me semblait que j’étais moi-même ce dont parlait l’ouvrage: une église, un quatuor, la rivalité de François Ier et de Charles-Quint. 

Cette croyance survivait pendant quelques secondes à mon réveil; elle ne choquait pas ma raison, mais pesait comme des écailles sur mes yeux et les empêchait de se rendre compte que le bougeoir n’était plus allumé. 
Puis elle commençait à me devenir inintelligible, comme après la métempsycose les pensées d’une existence antérieure; le sujet du livre se détachait de moi, j’étais libre de m’y appliquer ou non; aussitôt je recouvrais la vue et j’étais bien étonné de trouver autour de moi une obscurité, douce et reposante pour mes yeux, mais peut-être plus encore pour mon esprit, à qui elle apparaissait comme une chose sans cause, incompréhensible, comme une chose vraiment obscure. Je me demandais quelle heure il pouvait être; j’entendais le sifflement des trains qui, plus ou moins éloigné, comme le chant d’un oiseau dans une forêt, relevant les distances, me décrivait l’étendue de la campagne déserte où le voyageur se hâte vers la station prochaine; et le petit chemin qu’il suit va être gravé dans son souvenir par l’excitation qu’il doit à des lieux nouveaux, à des actes inaccoutumés, à la causerie récente et aux adieux sous la lampe étrangère qui le suivent encore dans le silence de la nuit, à la douceur prochaine du retour.

#### Sortie
```
Longtemps, je me suis couché de bonne heure. Parfois, à peine ma bougie éteinte,
mes  yeux  se fermaient si  vite que  je n’avais pas  le temps  de me dire:  «Je
m’endors.» Et, une demi-heure après, la pensée qu’il  était temps de chercher le
sommeil m’éveillait;  je  voulais poser le volume que je croyais  avoir dans les
mains et souffler  ma lumière;  je n’avais  pas cessé  en dormant de  faire  des
réflexions sur ce que je  venais  de  lire, mais  ces réflexions avaient pris un
tour un peu particulier;  il  me  semblait que j’étais moi-même  ce dont parlait
l’ouvrage:  une  église,  un   quatuor,  la  rivalité  de  François  Ier  et  de
Charles-Quint. 

Cette  croyance  survivait  pendant quelques  secondes  à mon  réveil;  elle  ne
choquait pas  ma raison, mais pesait comme  des écailles  sur  mes  yeux et  les
empêchait de se rendre compte que le bougeoir n’était plus allumé. 
Puis elle  commençait à me  devenir inintelligible,  comme après la métempsycose
les pensées d’une existence antérieure; le  sujet  du livre se détachait de moi,
j’étais libre de m’y appliquer  ou non; aussitôt je recouvrais la vue et j’étais
bien étonné de trouver autour de moi une obscurité, douce et reposante  pour mes
yeux, mais peut-être plus  encore pour mon esprit, à qui elle apparaissait comme
une chose sans  cause, incompréhensible, comme une chose vraiment obscure. Je me
demandais quelle heure il pouvait  être; j’entendais  le  sifflement  des trains
qui, plus  ou moins éloigné, comme le chant d’un oiseau dans une forêt, relevant
les  distances, me décrivait l’étendue de la campagne déserte où  le voyageur se
hâte vers la station prochaine; et le petit chemin qu’il suit va être gravé dans
son souvenir  par  l’excitation  qu’il doit à  des lieux  nouveaux, à  des actes
inaccoutumés, à la causerie récente et aux adieux sous la lampe étrangère qui le
suivent encore dans le silence de la nuit, à la douceur prochaine du retour.
```


