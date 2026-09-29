# Compatibilité

## Support visé

NoyaFin360 cible Jellyfin 12 Modern UI et les clients basés sur Jellyfin Web.

### Modes d'interaction

- Souris
- Clavier
- Tactile
- Télécommande / D-pad

### Formats

- Mobile
- Tablette
- Desktop
- Télévision grand écran

## Limite importante

Le support du Custom CSS dépend du client.

Un client qui affiche ou embarque Jellyfin Web peut récupérer le thème. Une application native disposant de sa propre interface peut ne pas l'appliquer.

Aucune plateforme ne doit être déclarée totalement compatible avant d'avoir été testée.

## Matrice

| Plateforme / client | Statut | Notes |
|---|---|---|
| Jellyfin Web desktop (Modern) | Prévu | Cible principale (Modern par défaut en Jellyfin 12) |
| iOS web / WebView | Prévu | Tester les safe areas |
| Android web / WebView | Prévu | |
| Navigateur Smart TV (Jellyfin Web) | Prévu | Focus D-pad critique ; surveiller le coût du flou |
| Android TV / Google TV (app native) | Non applicable | Interface native — Custom CSS non appliqué |
| Application WebOS (LG) | Prévu | Risque de glyphes d'icônes ; CSS conservateur |
| Jellyfin Media Player | Limité | Ancien moteur Qt : pas de `:has()`, `backdrop-filter` faible |
| Freebox / environnements TV | À étudier | Dépend du client utilisé |

Risques vérifiés et règles de dégradation détaillés : [platform-risks.fr.md](./platform-risks.fr.md).
