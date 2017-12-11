fs = require('fs')

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1); 
  }

fs.readFile('C:\\Users\\jdekoning.IPSOFT\\Downloads\\fontawesome-free-5.0.1\\fontawesome-free-5.0.1\\advanced-options\\metadata\\icons.json', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  var obj = (JSON.parse(data));

  results = ''; 
  for (i in obj) {
    /*
      A valid definition looks like this in LaTeX: ​​​​​
      \def\faWPBeginner{\FAB\symbol{"F297}}​​​​​
      Let's build that 
    */

    //define start of string '\def\fa' 
    var start = '\\def\\fa' 

    //Define the label
    //Sanatizing the label name for use of Font Awesome 5 in LaTeX
    var name = obj[i].label.               // add fa Prefix  
        split(/\-|\s/).map(function(entry) {        // Replace white space and -
            return capitalizeFirstLetter(entry);    // Camel Case instead
        }).join('').                                // Join back to string
        replace(/'|\(|\)/g,'').                     // Remove ', ( and )
        replace('1/4','Quarter').                   // Remove illegal numbers 
        replace('1/2','Half').                      // And slashes
        replace('3/4','ThreeQuarter').
        replace('500','FiveHundred').
        replace('2','Two').
        replace('3','Three').
        replace('4','Four').
        replace('5','Five').
        replace('8','Eight')

    //If we encounter a number, the sanitization needs to be updated. 
    if (name.match(/\d/)) {
        throw('unreplaced number in: ' + str)
    }
    
    //Some icons have solid and regular fonts, we loop over styles to add both. 
    for (j = 0; j < obj[i].styles.length; j++) {
        //Set unique suffix if we have more then one style
        if (obj[i].styles.length > 1) {
            var suffix = obj[i].styles[j] == 'brands' ? 'B' : obj[i].styles[j] == 'solid' ? 'S' : obj[i].styles[j] == 'regular' ? 'R' : 'N'
        } else {
            //Use empty string if we have just one.
            var suffix = '';
        }

        //Set font prefix FAB, FAS or FAR (Brands, Solid, Regular)
        var prefix = obj[i].styles[j] == 'brands' ? '\\FAB' : obj[i].styles[j] == 'solid' ? '\\FAS' : obj[i].styles[j] == 'regular' ? '\\FAR' : 'N'

        //Concatenate the string
        var str = start + name + suffix + '{' + prefix + '\\symbol{"' + obj[i].unicode.toUpperCase() + '}}'
        results += str + '\n'
    }
  }

  console.log(results)
});