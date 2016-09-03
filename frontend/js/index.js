function playRandomWord(prev) {
	var words = ['Healthcare', 'Education', 'Transportation', 'Finance',
				 'Law', 'Government', 'Food', 'SaaS', 'Genomics', 'Travel'
		].filter(function(word) {
		return prev == null || word != prev;
	});
	var index = Math.floor(Math.random() * words.length);
	$('.aiplus-placeholder').html("");
	$('.aiplus-cursor').html("");
	playWord(words[index]);
}

function playCharacter(word, index, max_index) {
	if(index == 0) {
		$('.aiplus-cursor').html("_");
	}else{
		substr = word.substring(0, index)
		$('.aiplus-placeholder').html(substr);
	}
	index += 1;
	if(index <= word.length) {
		setTimeout(playCharacter.bind(this, word, index, max_index), 100);
	}else if(index < max_index) {
		setTimeout(function() {
			$('.aiplus-cursor').toggleClass('on')
			playCharacter(word, index, max_index)
		}, 300);
	}else{
		playRandomWord(word);
	}
}

function playWord(word) {
	setTimeout(playCharacter.bind(this, word, 0, 30), 1000);
}

$(function() {
	playRandomWord();
});