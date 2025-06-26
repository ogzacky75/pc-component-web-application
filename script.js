const darkmode = document.getElementById('darkmode')
const submitbtn = document.getElementById('submit')
const resetbtn = document.getElementById('reset')
const formDiv = document.getElementsByClassName('.form-div')
const finalTest = document.querySelector('.final-test')

darkmode.addEventListener('click', ()=>{
	document.body.classList.toggle('dark-mode')
	document.body.style.transition='1s'
	finalTest.classList.toggle('dark-mode')

	
})

submitbtn.addEventListener('click', ()=>{
	darkmode.onclick()

})
resetbtn.addEventListener('click', ()=>{
	darkmode.onclick()
	
})