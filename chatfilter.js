
exports.process = function(data) {
  try {
    JSON.parse(data);
  } catch (e) {
    return "Error";
  }
  var dict = JSON.parse(data);
  if (dict.hasOwnProperty("message") && dict.hasOwnProperty("words")) {
  var filter = dict.message; 
  var words = dict.words;
  var banned = JSON.parse(words);
  for (i = 0; i < banned.length; i++) {
    var count = "";
    var word = banned[i];
    for (x = 0; x < word.length; x++) {
count = count + "*";
}
    var re = new RegExp(banned[i],"gi");
      var filter = filter.replace(re,count);
      filter = filter.replace(banned[i],count);
  }
    dict.filtered = filter;
    delete dict.words;
  return JSON.stringify(dict);
  }
}
