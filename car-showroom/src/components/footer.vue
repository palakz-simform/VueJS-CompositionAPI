<template>
    <div class="footer">
        <div class="social-row">
            <h2>Social Media</h2>
            <div class="social">
                <p><a href="instagram.com"><i class="fa-brands fa-instagram fa-2xl"></i></a></p>
                <p><a href="#"><i class="fa-brands fa-square-facebook fa-2xl"></i></a></p>
                <p><a href="#"><i class="fa-brands fa-youtube fa-2xl"></i></a></p>
                <p><a href="#"><i class="fa-brands fa-square-twitter fa-2xl"></i></a></p>
                <p><a href="#"><i class="fa-brands fa-linkedin fa-2xl"></i></a></p>
            </div>
            <hr>
        </div>

        <div class="quick-links">
            <div class="common-row">
                <h2>Contact</h2>
                <p><a href="#">Find a Dealer</a></p>
                <p><a href="#">Request a Test drive</a></p>
                <p><a href="#">Career</a></p>
                <p><a href="#">Contact Us</a></p>
            </div>
            <div class="common-row">
                <h2>Quick Links</h2>
                <p><a href="#">Cars financial Service</a></p>
                <p><a href="#">Cars Safety</a></p>
                <p><a href="#">EMI Calculator</a></p>
            </div>
            <div class="common-row">
                <h2>Legal</h2>
                <p><a href="#">Legal Imprint</a></p>
                <p><a href="#">Privacy Policy</a></p>
                <p><a href="#">Terms and Conditions</a></p>
            </div>
            <div class="common-row">
                <h2>Experience Cars</h2>
                <p><a href="#">Cars group</a></p>
                <p><a href="#">Cars Club</a></p>
                <p><a href="#">Cars Motorrad</a></p>
            </div>
        </div>
        <div class="row-copyright">
            <p><a href="#">&copy; Car Gallery</a></p>
            <p><a href="#">Request a Test Drive</a></p>
            <p><a href="#">Legal Desclaimer</a></p>
            <p><a href="#">Contact Us</a></p>
        </div>

    </div>
</template>
<script>
export default {
    name: "carFooter"
}
</script>
<style scoped>
.footer {
    margin-top: 300px;
    margin-bottom: 0px;
    width: 100%;
    background-color: rgb(0, 0, 0);
    border: 0;
    box-shadow: 10px 10px 30px 4px rgba(255, 255, 255, 0.75);
    color: white;
}

.social {
    display: flex;
    margin: 0 auto;
}

.social-row {
    display: flex;
    flex-direction: column;
    text-align: center;
}

hr {
    color: white;
    width: 80%;
}

i {
    color: white;
    padding-right: 50px;
    padding-left: 50px;
}

i:hover {
    color: rgb(35, 177, 172);
}

.common-row p a {
    color: white;
}

.common-row p a:hover {
    color: rgb(35, 177, 172);
}

.quick-links {
    display: flex;
    justify-content: space-around;
}

.row-copyright {
    background-color: white;
    display: flex;
    justify-content: space-around;
}

.row-copyright p a {
    color: rgb(0, 0, 0);
    font-weight: bold;
}

.row-copyright p a:hover {
    color: rgb(35, 177, 172)
}

@media (max-width: 920px) {
    .quick-links {
        display: grid;
        grid-template-columns: auto auto;
        margin-left: 20px;
        margin-right: 20px;
    }

    i {
        color: white;
        padding-right: 20px;
        padding-left: 20px;
    }

}

@media (max-width: 600px) {
    .row-copyright {
        display: grid;
        grid-template-columns: auto auto;
        font-size: 12px;
    }

    .row-copyright p {
        margin-right: px;
    }

    .social-row h2 {
        font-size: 18px;
    }

    .common-row h2 {
        font-size: 18px;
    }

    .common-row p {
        font-size: 12px;
    }
}
</style>