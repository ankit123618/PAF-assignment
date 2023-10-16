// SELECTING CONTAINERS TO SHOW ITEMS
let section1 = document.getElementById("section1");
let videosection = document.getElementById("video-series");

let xhr = new XMLHttpRequest();
xhr.onload = () => {
    let result = xhr.responseText;
    // console.log(result);

    let obj = JSON.parse(result);

    let ct = obj.details.title
    let subtitle = obj.details.subtitle
    let description = obj.details.description

    let iurl = obj.details.thumbnail.domain
    let imagePath = obj.details.thumbnail.basePath + '/' + obj.details.thumbnail.key;
    let imageUrl = iurl + '/' + imagePath;

    console.log(imageUrl);



    let img = document.createElement("img")
    img.src = imageUrl
    img.alt = "api img error"

    document.getElementById("cimage").appendChild(img)
    document.getElementById("course-title").innerHTML = ct
    document.getElementById("course-subtitle").innerHTML = subtitle
    document.getElementById("course-description").innerHTML = description

    document.getElementById("total").innerHTML = "(" + obj.courses.length + ")"

    
    for (let index = 0; index < obj.courses.length; index++) {
        
        let element = obj.courses[index];
        let no = document.createElement("p")
        no.className = "video-series-no"
        no.innerHTML = "भाग " + (index+1)
        // document.getElementById("video-series").appendChild(no)
       
        let vct = element.title
        let vcst = element.subtitle
        let vctime = element.courseHours
        let vcamt = element.amount
        let vcoriginalAmount = element.originalAmount
        let vclanguage = element.language
        let vcimage = element.thumbnail

        console.log(vct);
        console.log(vcst);
        console.log(vctime);
        console.log(vcamt);
        console.log(vcoriginalAmount);
        console.log(vclanguage);
        console.log(vcimage);
        
        // Calculate hours and minutes
        let totalMinutes = vctime * 60;
        let hours = Math.floor(totalMinutes / 60);
        let minutes = parseInt(totalMinutes % 60);
        
        // Create a formatted string
        let formattedTime = `${hours} hours and ${minutes} minutes`;
        console.log(formattedTime);
        
        let title = document.createElement("p")
        title.style.fontWeight = "bold"
        let subtitle = document.createElement("p")
        subtitle.style.fontWeight = "bold"
        let time = document.createElement("p")
        let contribution = document.createElement("p")
        // let amount = document.createElement("p")
        // let originalAmount = document.createElement("p")
        let language = document.createElement("p")
        language.className = "video-series-lang"
        let picture = document.createElement("img")

        title.innerHTML = vct
        subtitle.innerHTML = vcst
        time.innerHTML = formattedTime
        contribution.innerHTML = "contribution: "+ vcamt+"₹"+` <del>${vcoriginalAmount}</del>`
        // amount.innerHTML = vcamt
        // originalAmount.innerHTML = vcoriginalAmount
        language.innerHTML = vclanguage
        picture.innerHTML = vcimage

       




        let innerdiv = document.createElement("div")
        innerdiv.className = "course-box"

        innerdiv.appendChild(no)
        innerdiv.appendChild(title)
        innerdiv.appendChild(subtitle)
        innerdiv.appendChild(time)
        innerdiv.appendChild(contribution)
        // innerdiv.appendChild(amount)
        // innerdiv.appendChild(originalAmount)
        innerdiv.appendChild(language)
        innerdiv.appendChild(picture)

        videosection.appendChild(innerdiv)
    }

    

    for (let index = 0; index < obj.relatedContent.length; index++) {
        let element = obj.relatedContent[index];

        let vct = element.title
        let vcst = element.subtitle
        let coursesCount = element.coursesCount
        let thumbnail = element.thumbnail

        console.log(vct);
        console.log(vcst);
        console.log(coursesCount);
        console.log(thumbnail);

        let title = document.createElement("p")
        title.style.fontWeight = "bold"
        let subtitle = document.createElement("p")
        subtitle.style.fontWeight = "bold"
        let cc = document.createElement("p")
        let img = document.createElement("img")


        title.innerHTML = vct
        subtitle.innerHTML = vcst
        cc.innerHTML = coursesCount+" video series"

        let innerdiv = document.createElement("div")
        innerdiv.className = "other-course-box"

        innerdiv.appendChild(title)
        innerdiv.appendChild(subtitle)
        innerdiv.appendChild(cc)
        innerdiv.appendChild(img)

        document.getElementById("other").appendChild(innerdiv)
    }


}
xhr.open("get", "https://api.acharyaprashant.org/v2/legacy/courses/series/optuser/course-series-eeb9d3");
xhr.send();

let xhr2 = new XMLHttpRequest();

xhr2.onload = () => {
    let result = xhr2.responseText;
    // console.log(result);

    let obj = JSON.parse(result);
    // console.log(obj);

    for (let index = 0; index < obj.length; index++) {
        let element = obj[index];
        // creating accordion dynamicially
        let accordion = document.createElement("div")
        accordion.className = "accordion"
        accordion.id = "accordionExample" + index


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
        accordionButton.setAttribute("aria-controls", "collapseOne" + index)
        accordionButton.setAttribute("data-bs-target", "#collapseOne" + index)
        accordionButton.innerHTML = element.question

        accordionHeader.appendChild(accordionButton)

        let accordionB = document.createElement("div")
        accordionB.className = "accordion-collapse collapse show"
        accordionB.id = "collapseOne" + index
        accordionB.setAttribute("data-bs-parent", "#accordionExample" + index)

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
