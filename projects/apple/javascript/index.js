document.getElementById('date').innerHTML = 'Today\'s Date: ' + new Date().toDateString();

function utt_process() {
    let utt = document.getElementById('utt').value;
    let processed_utt = utt.replace(/[|]\S\w*/g, '')
    document.getElementById('result').innerHTML = processed_utt;
}
document.getElementById('process').addEventListener('click', utt_process);
