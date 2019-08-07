# Address Book
Write a program that functions as an address book. It should have entries containing at least the following information: first and last name, phone number, address, and email address. At a minimum you’ll want an address book entry class. You should be able to add entries and search for entries (by last name at a minimum).

In order to save the address book for later you’ll need to write it to a file. Don’t worry about saving the address book to a file if you don’t already know how to do that. Other C# courses on Treehouse teach how to do that.

# Geometry Calculator
Create a program that prints out various properties of shapes. For 2D shapes these could include the number of sides, number of vertices, area, perimeter / circumference, the number of lines of symmetry, longest dimension, number of parallel sides, and sum of the angles. You can add 3D shapes that in addition to the 2D properties also have a volume.

Allow the user to enter the relevant dimensions of the shapes and then calculate the remaining properties.

Here’s a list of common geometric shapes: http://www.math-salamanders.com/list-of-geometric-shapes.html

# Battleship
Recreate a computer console based version of the popular [Battleship game](https://en.wikipedia.org/wiki/Battleship_(game)). At a minimum, you’ll want to have classes for player, ship, and board. You might want to make other classes as well.

Start by making a two player game where each player has only one ship that takes up a single grid square on the game board. Players should be able select where they want to place their ships.

The game board is typically a 10x10 grid, but you might want to make the game board smaller to start out. You should be able to change the game board size by changing the value of a single constant.

You may also want to provide a single player option where you play against the computer. Use System.Random to randomly place the computer’s ships and to guess the location of its opponent’s ships. Think about ways you can make the computer a more challenging opponent by making it “smarter”.

You can continue to make the game more complex and interesting by adding more types of ships or allowing the ships to move. Come up with more ways to make the game more interesting and challenging and then implement them in your game.

Be sure to practice good input validation by checking that players aren’t accidentally placing ships outside of the boundaries of the game board or on top of other ships. Also check that players don’t accidentally guess locations that they’ve already guessed.

# Card Game
Create a computer console based version of your favorite card game. You’ll probably want to have classes for a player’s hand, a card, the table, the deck, and a round or game.

Your program should actually "shuffle" cards in an array before each deal (sounds like another good use for System.Random). It is not necessary to print graphical-looking cards on the screen. The game should support multiple players and never deal the same card twice.

Add the ability to play against one or more computer opponents. Think about ways you can make the computer a more challenging opponent by making it “smarter”.

Have your program enforce the rules of the game. Example card games include: [Hearts](https://en.wikipedia.org/wiki/Hearts), [Gin Rummy](https://en.wikipedia.org/wiki/Gin_rummy), or [Go Fish](https://en.wikipedia.org/wiki/Go_Fish). Pick one that you enjoy, but be sure to think about how some games might be harder to implement than others.
