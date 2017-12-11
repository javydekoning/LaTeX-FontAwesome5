# LaTeX-FontAwesome5
How to use FontAwesome 5 otf fonts with XeLaTeX

1. Save the fonts folder, fontawesome.sty and fontawesomesymbols.tex to your project folder.
2. Put \usepackage{fontawesome} into your preamble.
3. Done!

## Want to compile a new version yourself? 

1. Download latest font from FontAwesome website.
2. Extract latest otf fonts and icons.json metadata from zip.
2. Run createDefinitions.js with nodejs to generate new fontawesomesymbols.tex

# Using ShareLatex.com? 
Don't forget to set compiler to XeLaTex