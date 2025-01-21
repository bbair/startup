# Salvo Attack
Salvo Attack is a spinoff of the well-known game of Battleship. In this online naval battle game, you will be able to attack with each of your ships, trying to sink your opponent's ships before they sink yours!

## Notes File
[HERE](notes.md)

## Website link
[salvoattack](https://startup.salvoattack.click)

## Specification Deliverable
### Elevator Pitch
If you've gotten bored with the original version of the game Battleship, then this spinoff may interest you! You can play out a more realistic naval battle with a friend online! Similar to real overseas combat, each turn you will be able to attack with each ship in your armada that has not yet been sunk. Try and take out your opponent's fleet before they sink yours.

### Design
#### Login Page
![Login Page](Images/LoginPageDesign.PNG)
#### Play Page
![Play Page](Images/PlayPageDesign.PNG)
#### Change Color Palette Page
![Color Palette Page](Images/ColorPalettePageDesign.PNG)
#### About/Rules Page
![About Page](Images/AboutPageDesign.PNG)

### Key Features
- Login, logout, and register
- Play by choosing spots to place your ships and spots to attack your opponent's ships
- Opponent's moves displayed when they are submitted and your hits on their ships are displayed when you hit them
- See a description of the app
- Change the color palette

### Technologies
I am going to use the required technologies in the following ways:

- HTML - Four different views, login/register controls, play, change color palette, and about.
- CSS - Application styling for different screen sizes, responsive design, good whitespace.
- React - Routing between views, dynamically change color palette, and reactive user controls.
- Service - Endpoints for authentication, storing/retrieving ship positions and hits. Third party call to get color palette.
- DB/Login - Stores authentication, positions, and hits.
- WebSocket - Broadcast opponent's attacks and hits.

## HTML Deliverable
For this deliverable I built out the structure of my application using HTML.

- [x] **HTML pages** - Four HTML pages that represent the ability to login, play, customize the color palette, and learn about the website and the rules.
- [x] **Proper HTML element usage** - I used HTML tags, including BODY, NAV, MAIN, HEADER, FOOTER, to give structure to the pages. I also used buttons, inputs, color pickers, svgs, and more to add some functionality/design to the pages.
- [x] **Links** - All pages link to the other pages.
- [x] **Text** - About/rules page has textual description of the page and the rules of the game.
- [x] **Placeholder for 3rd party service calls** - The 'generate' button in the color palette page will be linked to an external API to generate a custom color palette for the website.
- [x] **Images** - Displays title image on each page.
- [x] **Login** - Placeholder for authentication on the login page. Place for user's name to be displayed on the play page.
- [x] **DB** - Authentication information, including the user's name, as well as the user's custom palette for the site will be stored in the database and displayed on the play (user's name) and color palette (custom palette as current colors) pages respectively.
- [x] **WebSocket** - The player and opponent's boards on the play page will populate in real time with hits and misses.