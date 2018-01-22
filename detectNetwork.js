// Given a credit card number, this function should return a string with the 
// name of a network, like 'MasterCard' or 'American Express'
// Example: detectNetwork('343456789012345') should return 'American Express'

// How can you tell one card network from another? Easy! 
// There are two indicators:
//   1. The first few numbers (called the prefix)
//   2. The number of digits in the number (called the length)

  // Note: `cardNumber` will always be a string
  // The Diner's Club network always starts with a 38 or 39 and is 14 digits long
  // The American Express network always starts with a 34 or 37 and is 15 digits long
  // Visa always has a prefix of 4 and a length of 13, 16, or 19.
  // MasterCard always has a prefix of 51, 52, 53, 54, or 55 and a length of 16.
  // China UnionPay always has a prefix of 622126-622925, 624-626, or 6282-6288 and a length of 16-19.
  // Switch always has a prefix of 4903, 4905, 4911, 4936, 564182, 633110, 6333, or 6759 and a length of 16, 18, or 19.

  //Heads up! Switch and Visa seem to have some overlapping card numbers - in any apparent conflict, you should choose the network with the longer prefix.

  // Once you've read this, go ahead and try to implement this function, then return to the console.

var range = function(start, end) {
	var rangeArray = [];
	for (var i = start; i <= end; i++){
		rangeArray.push(i);
	}
	return rangeArray
};


var cardList = {
	diner: {
		name: 'Diner\'s Club',
		prefix: [38, 39],
		len: [14]
	},
	amex: {
		name: 'American Express',
		prefix: [34, 37],
		len: [15]
	},
	visa: {
		name: 'Visa',
		prefix: [4],
		len: [13, 16, 19]
	},
	mc: {
		name: 'MasterCard',
		prefix: [range(51, 55)],
		len: [16]
	},
	discover: {
		name: 'Discover',
		prefix: [6011, range(644, 649), 65],
		len: [16, 19]
	},
	maestro: {
		name: 'Maestro',
		prefix: [5018, 5020, 5038, 6304],
		len: [range(12, 19)]
	},
	cup: {
		name: 'China UnionPay',
		prefix: [range(622126, 622925), range(624, 626), range(6282, 6288)],
		len: [range(16, 19)]
	},
	sw: {
		name: 'Switch',
		prefix: [4903, 4905, 4911, 4936, 564182, 633110, 6333, 6759],
		len: [16, 18, 19]
	}
};


var detectNetwork = function(cardNumber) {
	var cardNumString = cardNumber.toString();

	var cardLength = cardNumString.length;

	var prefixCheck = false;
	var lengthCheck = false;

	var cardMatchPrefix = '';
	var cardMatchLen;
	var cardMatchName;

	for (card in cardList){
		var cardName = cardList[card]["name"];
		//To flatten multidimensional arrays
		var prefixEl = [].concat.apply([], cardList[card]["prefix"]);
		var lengthEl = [].concat.apply([], cardList[card]["len"]);

		for (var i = 0; i < prefixEl.length; i++){
			var prefixElString = prefixEl[i].toString();

			var prefixElLen = prefixElString.length;

			var cardPrefix = cardNumString.substring(0,prefixElLen);

			if (cardPrefix === prefixElString) {
				if (cardMatchPrefix === '') {
					cardMatchPrefix = prefixEl[i];
					cardMatchLen = lengthEl;
					cardMatchName = cardName;
				}
				else if (cardMatchPrefix < prefixEl[i]) {
					cardMatchPrefix = prefixEl[i];
					cardMatchLen = lengthEl;
					cardMatchName = cardName;
				}
			}
		}
	}

	for (var i = 0; i < cardMatchLen.length; i++) {
		if (cardLength === cardMatchLen[i]) {
			return cardMatchName;
			break;
		}
	}

};



