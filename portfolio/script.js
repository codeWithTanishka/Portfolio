const header=document.getElementById("header");
const navToggle=document.getElementById("navToggle");
const navMenu=document.getElementById("navMenu");
const navLinks=document.querySelectorAll(".nav-link");
const backTop=document.getElementById("backTop");
const form=document.getElementById("contactForm");
const status=document.getElementById("formStatus");

navToggle.addEventListener("click",()=>{
  const open=navMenu.classList.toggle("open");
  navToggle.setAttribute("aria-expanded",String(open));
  navToggle.setAttribute("aria-label",open?"Close menu":"Open menu");
});
navLinks.forEach(link=>link.addEventListener("click",()=>{
  navMenu.classList.remove("open");
  navToggle.setAttribute("aria-expanded","false");
}));

window.addEventListener("scroll",()=>{
  header.classList.toggle("scrolled",scrollY>20);
  backTop.classList.toggle("show",scrollY>500);
  let current="home";
  document.querySelectorAll("section[id]").forEach(section=>{
    if(scrollY>=section.offsetTop-140) current=section.id;
  });
  navLinks.forEach(link=>link.classList.toggle("active",link.getAttribute("href")===`#${current}`));
});

backTop.addEventListener("click",()=>scrollTo({top:0,behavior:"smooth"}));

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target);}
  });
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

form.addEventListener("submit",e=>{
  e.preventDefault();
  const name=document.getElementById("name").value.trim();
  const email=document.getElementById("email").value.trim();
  const message=document.getElementById("message").value.trim();
  if(!name||!email||!message){status.textContent="Please complete all fields.";return;}
  status.textContent="Thanks! Your message is ready to be connected to your email service.";
  form.reset();
});

document.getElementById("year").textContent=new Date().getFullYear();
