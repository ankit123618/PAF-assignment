const section1 = document.getElementById("section1");
const videosection = document.getElementById("video-series");

const xhr = new XMLHttpRequest();
xhr.onload = () => {
    const result = xhr.responseText;
    console.log(result);

    let obj = JSON.parse(result);
    
    const ct = obj.details.title
    const subtitle = obj.details.subtitle
    const description = obj.details.description
    const iurl = obj.details.thumbnail.domain
    const imagePath = obj.details.thumbnail.basePath + '/' + obj.details.thumbnail.key;
    const imageUrl = iurl + '/' + imagePath;

    
    
    const img = document.createElement("img")
    img.src = imageUrl
    img.alt = "api img error"
    
    section1.appendChild(img) 
    document.getElementById("course-title").innerHTML = ct
    document.getElementById("course-subtitle").innerHTML = subtitle
    document.getElementById("course-description").innerHTML = description
    
    for (let index = 0; index < obj.courses.length; index++) {
        const element = obj.courses[index];
        
        const vct = element.title
        const vcst = element.subtitle
        const vctime = element.courseHours
        const vcamt = element.amount
        const vcoriginalAmount = element.originalAmount
        const vclanguage = element.language
       
        console.log(vct);
        console.log(vcst);
        console.log(vctime);
        console.log(vcamt);
        console.log(vcoriginalAmount);
        console.log(vclanguage);

        const title = document.createElement("p")
        const subtitle = document.createElement("p")
        const time = document.createElement("p")
        const amount = document.createElement("p")
        const originalAmount = document.createElement("p")
        const language = document.createElement("p")
        
        title.innerHTML = vct
        subtitle.innerHTML = vcst
        time.innerHTML = vctime
        amount.innerHTML = vcamt
        originalAmount.innerHTML = vcoriginalAmount
        language.innerHTML = vclanguage

        let innerdiv = document.createElement("div")
        innerdiv.className = "course-box"
        
        innerdiv.appendChild(title)
        innerdiv.appendChild(subtitle)
        innerdiv.appendChild(time)
        innerdiv.appendChild(amount)
        innerdiv.appendChild(originalAmount)
        innerdiv.appendChild(language)

        videosection.appendChild(innerdiv)
    }

    for (let index = 0; index < obj.relatedContent.length; index++) {
        const element = obj.relatedContent[index];
        
        const vct = element.title
        const vcst = element.subtitle
        const coursesCount = element.coursesCount
        const thumbnail = element.thumbnail
       
        console.log(vct);
        console.log(vcst);
        console.log(coursesCount);
        console.log(thumbnail);

        const title = document.createElement("p")
        const subtitle = document.createElement("p")
        const cc = document.createElement("p")
        const img = document.createElement("img")
        
        
        title.innerHTML = vct
        subtitle.innerHTML = vcst
        cc.innerHTML = coursesCount
        
        let innerdiv = document.createElement("div")
        innerdiv.className = "other-course-box"
        
        innerdiv.appendChild(title)
        innerdiv.appendChild(subtitle)
        innerdiv.appendChild(cc)
        innerdiv.appendChild(img)

        videosection.appendChild(innerdiv)
    }


}
xhr.open("get","https://api.acharyaprashant.org/v2/legacy/courses/series/optuser/course-series-eeb9d3");
xhr.send();

const xhr2 = new XMLHttpRequest();

xhr2.onload = () => {
    const result = xhr2.responseText;
    console.log(result);

    let obj = JSON.parse(result);
    console.log(obj);

    for (let index = 0; index < obj.length; index++) {
        const element = obj[index];
        // creating accordion dynamicially
        let accordion = document.createElement("div")
        accordion.className = "accordion"
        accordion.id = "accordionExample"+index

        
        let accordionItem = document.createElement("div")
        accordionItem.className = "accordion-item"
        
        accordion.appendChild(accordionItem)
        
        let accordionHeader = document.createElement("div") 
        accordionHeader.className = "accordion-header"
        
        accordionItem.appendChild(accordionHeader)
        
        let accordionButton = document.createElement("button")
        accordionButton.type = "button"
        accordionButton.className = "accordion-button"
        accordionButton.setAttribute("data-bs-toggle", "collapse")
        accordionButton.setAttribute("aria-expanded", "true")
        accordionButton.setAttribute("aria-controls", "collapseOne"+index)
        accordionButton.setAttribute("data-bs-target", "#collapseOne"+index)
        accordionButton.innerHTML = element.question
        
        accordionHeader.appendChild(accordionButton)
        
        let accordionB = document.createElement("div")
        accordionB.className = "accordion-collapse collapse show"
        accordionB.id = "collapseOne"+index
        accordionB.setAttribute("data-bs-parent", "#accordionExample"+index)
        
        accordionItem.appendChild(accordionB)


        let accordionBody = document.createElement("div")
        accordionBody.className = "accordion-body"
        accordionB.appendChild(accordionBody)

        let answer = document.createElement("p")
        answer.innerHTML = element.answer

        accordionBody.appendChild(answer)

        document.getElementById("faq").appendChild(accordion)
        



        console.log(element.question);
        console.log(element.answer);
    }
}
xhr2.open("get", "https://api.acharyaprashant.org/v2/legacy/courses/faqs?language=hindi");
xhr2.send();
