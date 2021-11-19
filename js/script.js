window.addEventListener("DOMContentLoaded", () => {


    function requestToServer(){

        getResource("http://localhost:3000/people")
            .then(data=>createCards(data))
            .catch(err=>console.error(err));
        
        this.remove();    
    }

    document.querySelector("button").addEventListener("click", requestToServer, {"once": true});




    async function getResource(url){
        
        const result = await fetch(`${url}`);

        if(!result.ok)
        {
            throw new Error(`Could not fetch ${url}, status: ${result.status})`);
        }

        return await result.json();

    }


    function createCards(data){
        data.forEach(item=>{
            let card = document.createElement('div');
            card.classList.add('card');

            let icon;
            if(item.sex == 'male')
            {
                icon = "icons/male.png"
            }
            else
            {
                icon = "icons/female.png"
            }

            card.innerHTML = `
                <img src="${item.photo}" alt="photo"/>
                <div class="name">${item.name} ${item.surname}</div>
                <div class="sex">
                    <img src=${icon} alt="icon"/>
                </div>
                <div class="age">${item.age}</div>
            `;

            document.querySelector('.app').appendChild(card);
        });
    }
});