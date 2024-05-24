// script.js

document.getElementById('expandButton').addEventListener('click', function() {
    var hiddenContent = document.getElementById('hiddenContent');
    if (hiddenContent.classList.contains('hidden')) {
        hiddenContent.classList.remove('hidden');
        this.textContent = 'Hide';
    } else {
        hiddenContent.classList.add('hidden');
        this.textContent = 'Categories';
    }
});
document.getElementById('expandbutton').addEventListener('click', function() {
    var hiddenContent = document.getElementById('hiddenContents');
    if (hiddenContent.classList.contains('hiddens')) {
        hiddenContent.classList.remove('hiddens');
        this.textContent = 'Hide';
    } else {
        hiddenContent.classList.add('hidden');
        this.textContent = 'Categories';
    }
});