var Films = require('../models/films');

var UI = function() {
  this.films = new Films();
  //this.render(films);
  this.films.all(function(result) {
    this.render(result);
  }.bind(this))
}

UI.prototype = {
  postFilm: function() {
    this.films.add(film, function(result) {
      this.render(result);
    }.bind(this))
  },

  createText: function(text, label) {
    var p = document.createElement('p');
    p.innerText = label + text;
    return p;
  },

  createForm: function() {
    var form = document.createElement('form');
    

    form.appendChild(this.createInput('text','title'));
    form.appendChild(this.createInput('text','genre'));
    var button = document.createElement('input');
    button.value = 'submit'
    button.type = 'submit'


    var self = this;

    button.onclick = function(event) {
      event.preventDefault();

      var film = {};

      var form = this.parentElement;

      for (var input of form.elements) {
        if (!(input.type === "submit")) {
          film[input.name] = input.value
        }
      }

      self.films.add(film, function(result) {
        self.render(result);
      })
    }
    
    form.appendChild(button);

    return form;
  },

  createInput: function(type, name) {
    var input = document.createElement('input');
    input.type = type;
    input.name = name;

    return input;
  },

  appendText: function(element, text, label) {
    var pTag = this.createText(text, label);
    element.appendChild(pTag);
  },

  createReview: function(li, review) {
    this.appendText(li, review.comment, 'Comment: ');
    this.appendText(li, review.rating, 'Rating: ');
    this.appendText(li, review.author, 'Author: ');
  },

  render: function(films) {
    var container = document.getElementById('films');
    container.innerHTML = "";

    for (var film of films) {
      var li = document.createElement('li');
      this.appendText(li, film.title, 'Film: ');
      this.appendText(li, film.genre, 'Genre: ');
      
      for (var review of film.reviews){
        this.createReview(li, review);
      }

      container.appendChild(li);

    }

    container.appendChild(this.createForm())  
  }
}

module.exports = UI;
