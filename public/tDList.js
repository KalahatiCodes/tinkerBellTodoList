const dayTally = document.getElementsByClassName("fa-solid fa-calendar-days");
const trash = document.getElementsByClassName("fa-trash");
Array.from(dayTally).forEach(function(element) {
      element.addEventListener('click', function(){
        const msg = this.parentNode.parentNode.childNodes[1].innerText
        const likes = parseFloat(this.parentNode.parentNode.childNodes[3].innerText)
        fetch('daysTally', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'msg': msg,
            'likes':likes,
            'action': 'like'
            // 'tallys':tallys,
            // 'action': 'tally'
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});

Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const msg = this.parentNode.parentNode.childNodes[1].innerText
        fetch('listItems', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'msg': msg
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});

// quotes API
  const qotd = document.getElementById('qotd')
  const qotdh = document.getElementById('qotdh')
  fetch(`https://quotes.rest/qod?category=inspire`)
 .then(res => res.json())
 .then(data =>{
     console.log(data)
     qotdh.innerHTML = `Quote of the Day`
     qotd.innerHTML = `${data.contents.quotes[0].quote} - ${data.contents.quotes[0].author}`
  })
 .catch(err => console.log(err))





