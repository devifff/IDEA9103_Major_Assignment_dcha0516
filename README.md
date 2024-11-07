# IDEA9103_Major_Assignment_dcha0516
This repo is for my final assignment of IDEA9103

# COMMIT 1

The first commit modifies the group code to make the circles in the figure move around when the song "RUDE-Eternal Youth" plays which is a Free to use, Royalty free music which has a *Creative Commons License* and allows to be used for a Non Commercial use


## HOW IT WORKS


Upon pressing the SpaceBar the song plays and the animation begins where the celestial bodies are created randomly, the grass cylinders move up and down and the river circles start moving up while the tree swings from left to right.


## THE CHANGES


In order to get this effect I made a few changes in the group's original code to suit my choice, hardcoding a few elements while making others dynamic and removing a loop and also relying on switch case statements to make the shapes move when song plays and stop when the song stops

## THOUGHTS

This artwork reminds me of Feudal Japan and the tree looks like a cherry blossom and this was the reason behind choosing this music. The key press functionality lacks the user interface and the user wouldn't exactly know how to interact with the artwork unless they read the code first and that is something I plan to work on in the next commit.





# COMMIT 2

In this commit I haven't changed a lot apart from adding the playmusic button and getting rid of the press spacebar function to play the music to make the design more user friendly.

# **Future Changes**

I will try to play around the code a little more and see what I can achieve, I dont want to change the music as it fits the scene.











# COMMIT 3

This is the final commit for this assignment and I feel happy with how far I was able to change the design from the group code and even my own previous 2 commits

# HOW TO INTERACT?

the interaction method still remains the same where a button needs to be pressed to start and pause the animation but this time a normal rectangle button has been turned into a dynamic button which changes upon interaction. Let the song play for a while to see the changes as the song progresses

# Technical Discussion

I used colorMode() function which I have previously used in Python but to revise and understand how it works in JavaScript I saw 2 youtube videos which are mentioned in the code comments. I made use of the HSB to play around with the colour of the elements and make them gradually change into a different colour when the music starts to play.

I also got rid of a drawTreeCircles function since I wasn't using it anymore in my iteration of the code. Created a class for petals which were earlier the instead to replace those circles with the petals and used a for loop to draw them. There is another loop which draws the falling petals in the function draw(). In the function setup() I declared the position for my button since I didn't want it to change upon beginning of the music

## **The Animation**

The shapes are changing colour in this commit but only the background gradients changes over time along with cylinders and circles which are floating towards the up.

## REFLECTIONS

I am proud with the design I have made but I can see that in order to get a more fuedal Japan aesthetic, I could have drew mountains in the background using perlin noise. I could have made this into a more realistic scene and let go of my fixation towards the circles.




## REFERENCES

**Song** - Rude. (2016). Eternal Youth [Song]. SoundCloud. https://soundcloud.com/itsrudeboy/eternal-youth
LICENSE: Creative Common License (read more: - https://creativecommons.org/licenses/by/4.0/)

**Inspiration** - Sucker Punch Productions. (Nov, 2024). Ghost of Tsushima. Sucker Punch Productions. https://www.suckerpunch.com/category/games/ghostoftsushima/


**Youtube Tutorials**

 Courtney Morgan (2017, May 8). SE2: 0.5.1 Using HSB Color Mode [Video]. YouTube. https://www.youtube.com/watch?v=lt1lDp2aFLQ


TheBuffED. (2020, November 27). Generative Art Basics - Using HSB Color in P5.js [Video]. YouTube. https://www.youtube.com/watch?v=myWZUHvU6bg


Vira, P. (2020, November 10). How to Make a Gradient in p5.js [Video]. YouTube. https://www.youtube.com/watch?v=lPgscmgxcH0

