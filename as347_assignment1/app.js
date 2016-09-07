/*takes instagram location data from my account and creates infographic 
ornament that illustrates the places I've been around the world with bae */

var latitudes = new Array();
var longitudes = new Array();
var upper_y = new Array();
var lower_y = new Array();
var count = 0;
var offset = 50;

/*uses my unique accessToken and clientId and accesses my instagram account
gets all images with tag "tuckerandroxannesspectacularadventures and add's
the locaition information of each post to the longitudes and latitude arrays*/
 var userFeed = new Instafeed({
    get: 'user',
    userId: '3034560',
    clientId: '76ebf5755ee44186b5c5e9e9c8f98d68',
    accessToken: '3034560.1677ed0.67b60906b38b467b8b4b11634cc536c6',
    resolution: 'standard_resolution',
    template: '<ul id class="box"> <li class="lat"> {{model.location.latitude}} </li> <li class="long"> {{model.location.longitude}} </li> </ul>', 
      filter: function(image) {
        return image.tags.indexOf('tuckerandroxannesspectacularadventures') >= 0;
    },
    limit: 60,
    links: false,
    after: function() {
        if (!this.hasNext()) {
            moreButton.hide();
    }
      }
  });
    userFeed.run();
    /*gets the coordinates from each id and adds it to lists*/
    function getCoords() {
        count = document.getElementsByClassName("lat").length;
      
        for(i = 0; i < count; i++) {
            var latitude = document.getElementsByClassName("lat")[i].innerHTML;
            var longitude = document.getElementsByClassName("long")[i].innerHTML;
            
            latitudes.push(latitude);
            longitudes.push(longitude);
        }
        
    }
//Creates randomly sized and opacity orbs over each location point
//and adds "red string" points to a coordinate list to connect with the function Line
function Orbs() { 
    for(i=0; i <= count; i++) {
        stroke(255,70,88,random(150));
        strokeWeight(random(45));
        ellipseMode(RADIUS);
        var wh= random(45);
        ellipse(longitudes[i],latitudes[i]-offset, wh, wh);
        
        for(j = 0; j < wh; j++) {
            strokeWeight(2);
            stroke(0);
            if(j % 20 == 0) {
               var upper = latitudes[i]-offset + j + 1;
               upper_y.push(upper);
               var lower = latitudes[i]-offset - j - 1; 
               lower_y.push(lower);
            }
            
        }
    }
    
}

//connects every "red-string" coordinate together with a small line
function Lines() { 
    for(i = 0; i < upper_y.length; i++) {
        for( j = 0; j < i; j++) {
            stroke(255, 70, 88,random(90));
            strokeWeight(1);
            line(longitudes[i], upper_y[i], longitudes[j], upper_y[j]);
            line(longitudes[i], lower_y[i], longitudes[j], lower_y[j]);
        }
    }
}

//creates wireframe globe for reference on the canvas
function Globe() {
    stroke(195, 195, 195, 155);
    noFill();
    ellipseMode(RADIUS);
    ellipse(0,0, 95, 95);
    for(i = 0; i < 5; i++) {
        arc(0,0, 95, i * 20,0,2*PI);
        arc(0,0, i * 20, 95, 0, 2*PI);
    }   
}


function setup() {
  //gets the coordinates from my instagram posts
  getCoords(); 
  var size = 1080;
  createCanvas(size,size);
  background(255,255,255,255);
  //orients canvas to map coordinates to globe
    translate(0, 100);
    for(x = 0; x < 6; x++) {
        for(y = 0; y < 5; y++) {
            push();
            translate(x * 300, y * 250);
            Globe();
            Orbs();
            Lines();
            pop();
        }  
    } 
}

