var hass = {

    states: {
        'person.fred': {
            state: "Hogwarts",
            attributes: {
                friendly_name: "Fred Weasley",
                entity_picture: "https://pbs.twimg.com/profile_images/1564548093/fred-weasley-mobile-wallpaper.png"
            },
            last_updated: "2021-06-04T14:00:00.000Z"
        },
        'person.george': {
            state: "Hogwarts",
            attributes: {
                friendly_name: "George Weasley",
                entity_picture: "https://pbs.twimg.com/profile_images/1564548093/fred-weasley-mobile-wallpaper.png"
            },
            last_updated: "2021-06-04T14:00:00.000Z"
        },
        'person.ron': {
            state: "Hogwarts",
            attributes: {
                friendly_name: "Ron Weasley",
                entity_picture: "https://movie-fanatic-res.cloudinary.com/iu/s--fvLHc9Qx--/t_teaser_wide/cs_srgb,f_auto,fl_strip_profile.lossy,q_auto:420/v1364991133/ron-weasley-pic.jpg"
            },
            last_updated: "2021-06-04T22:49:00.000Z"
        },
        'person.ginny': {
            state: "Hogwarts",
            attributes: {
                friendly_name: "Ginny Weasley",
                entity_picture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy9Hw_Um6_JZVbi8v1GsL4kpsyGCw7lcKX9_auQzeiKUPJtBTBwQb_f96oYW4t42mAadE&usqp=CAU"
            },
            last_updated: "2021-06-04T22:46:00.000Z"
        },
        'person.arthur': {
            state: "Home",
            attributes: {
                friendly_name: "Arthur Weasley",
                entity_picture: "https://pbs.twimg.com/profile_images/1181298281877397504/3fD3j1lJ.jpg"
            },
            last_updated: "2021-06-04T22:44:00.000Z"
        },
        'person.molly': {
            state: "Home",
            attributes: {
                friendly_name: "Molly Weasley",
                entity_picture: "https://i.pinimg.com/600x315/24/b3/61/24b36117053e605166f0b8395a03bae3.jpg"
            },
            last_updated: "2021-06-04T22:41:00.000Z"
        }
    }

}

var config = {
    type: 'custom:weasly-card',
    groups: ['Home', 'Work', 'Hogwarts' ],
    entities: [
        'person.molly',
        'person.arthur',
        'person.ron',
        'person.ginny',
        'person.fred',
    ],
    first_name_only: true
}

class HACard extends HTMLDivElement {}

customElements.define('ha-card', HACard, {extends: 'div'});