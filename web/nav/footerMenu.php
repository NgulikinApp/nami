<footer>
    <div class="container">
        <div class="footer">
            <div class="footer-body">
                <div class="footer-body-left">
                    <img src="img/footerlogo.png">
                </div>
                <div class="footer-body-mid1">
                    <h3>NGULIKIN</h3>
                    <ul></ul>
                </div>
                <div class="footer-body-mid2">
                    <h3>GABUNG NGULIKERS INDONESIA</h3>
                    <ul>
                        <li>Cara Gabung Ngulikers</li>
                        <li>Produk Ngulikers</li>
                        <li>Bikin Toko</li>
                    </ul>
                </div>
                <div class="footer-body-mid3">
                    <h3>BANTUAN</h3>
                    <ul>
                        <li class="about-us">Tentang Kami</li>
                        <li>Hubungi Kami</li>
                        <li>Blog</li>
                        <?php
                            if(!isset($_SESSION['user'])){
                        ?>
                        <li>Login/Register</li>
                        <?php
                            }
                        ?>
                    </ul>
                </div>
                <div class="footer-body-right">
                    <h3>IKUTI KAMI</h3>
                    <ul class="list-socmed">
                        <li><i class="fa fa-facebook socmed-follow" datainternal-id="https://web.facebook.com/Ngulikincom-1901044953474837" title="facebook"></i></li>
                        <li><i class="fa fa-instagram socmed-follow" datainternal-id="https://www.instagram.com/ngulikin" title="instagram"></i></li>
                        <li><i class="fa fa-linkedin socmed-follow" datainternal-id="https://www.linkedin.com/company/ngulikin" title="linkedin"></i></li>
                    </ul>
                    <ul class="list-socmed">
                        <li><a datainternal-id="terms">Ketentuan</a></li>
                        <li datainternal-id="separator">|</li>
                        <li datainternal-id="privacy"><a datainternal-id="privacy">Kebijakan Privasi</a></li>
                        <li datainternal-id="separator">|</li>
                        <li><a datainternal-id="faq">FAQ</a></li>
                    </ul>
                     <ul class="list-socmed">
                        <li datainternal-id="copy">&copy; <?php echo date("Y"); ?> Ngulikin</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</footer>