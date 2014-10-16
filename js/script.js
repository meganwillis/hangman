var hangman = {
	init: function(){
		this.randomword = this.getword();
		this.createboxes();
		this.detectkeypress();
		$("#again").click(this.tryagain);
		$("#new").click(this.tryanother);
	},

	getword: function(){
		//Get length of the word list
		var listlength = this.wordlist.length;

		//Generate random number based on word list length
		var random = Math.round(Math.random()*(listlength-1));

		//Return random word
		return this.wordlist[random].toUpperCase();
	},
	createboxes: function(){
		var wordlength = this.randomword.length;
		var wordcontainer = $('#word');
		var boxcode = $('<span class="box">&nbsp;&nbsp;</span>');
		for(var i = 0; i < wordlength; i++){
			wordcontainer.append(boxcode.clone());
		}
	},
	detectkeypress: function(){
		var self = this;

		$("body").keyup(function(e){
			if(!self.gameover){
				//Checks that the key pressed is a letter
				if(e.which>64 && e.which<91){
					self.guess(String.fromCharCode(e.which));	
				}
			}
			else{
				$("body").off('keydown');
			}
		});
	},
	guess: function(letter){
		//Check if guess has already been made array.indexOf
		if(this.guesses.indexOf(letter)==-1){
			this.guesses.push(letter);

			if(this.randomword.indexOf(letter)==-1){
				this.wrongguess(letter);
			}
			else{
				this.rightguess(letter);
			}
		}
	},
	rightguess: function(letter){
		this.rightguesses.push(letter);
		var positions = this.getpositionsofletters(letter);
		var boxes = $(".box");
		for(var i=0; i<positions.length; i++){
			boxes.eq(positions[i]).addClass("hasletter").html(letter);
			this.numberofrightletters++;
		}
		if(this.numberofrightletters==this.randomword.length){
			alert("mefan won!");
			this.gameover=true;
			$("#gameover").addClass("showgameover");
		};
	},
	wrongguess: function(letter){
		this.wrongguesses.push(letter);
		$("#wrongguesses").append('<span class="wrongletter">'+letter+'</span>');
		if(this.wrongguesses.length>9){
			alert("mefan lost :(");
			this.gameover=true;
			$("#gameover").addClass("showgameover");
		}
	},
	getpositionsofletters: function(letter){
		var str = this.randomword;
		var indices = [];
		for(var i=0; i<str.length;i++) {
    		if (str[i] === letter) indices.push(i);
		}
		return indices;
	},
	reset: function(){
		$('#word,#wrongguesses').html('');
		hangman.guesses=[];
		hangman.rightguesses=[];
		hangman.wrongguesses=[];
		hangman.numberofrightletters=0;
		hangman.gameover=false;
		hangman.createboxes();
		hangman.detectkeypress();	
		$("#gameover").removeClass("showgameover");
	},
	tryagain: function(event){
		hangman.reset();
	},
	tryanother: function(event){
		hangman.randomword = hangman.getword();
		hangman.reset();
	},
	randomword: null,
	wordlist: ['mefan', 'developer', 'apple', 'bellend', 'floor', 'intentional', 'homage', 'business', 'dom', 'cat', 'milkshake', 'ironmonger', 'birthday', 'congratulations', 'february', 'candle', 'kardashian', 'cockjockey', 'rabid', 'fiesta', 'siesta', 'burrito', 'buddha', 'tesco', 'hangman', 'aliens', 'grumble', 'christmas', 'yiddish', 'skiddish', 'flexible', 'tottenham', 'delicious', 'rambunctious', 'trombone', 'socks', 'violin', 'kale', 'nacho', 'soup', 'reconciliation', 'agile', 'market', 'sharpie', 'roffey'],
	guesses: [],
	rightguesses: [],
	wrongguesses: [],
	numberofwrongguesses: 10,
	numberofrightletters: 0,
	gameover: false
};

hangman.init();