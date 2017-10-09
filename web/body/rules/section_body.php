<div class="home_container">
	<section class="container rules">
        <div class="grid-rules-header"></div>
        <div class="grid-rules-body">
            <div class="menu">
                <ul class="listTerms">
                    <li datainternal-id="terms">Persyaratan</li>
                    <li datainternal-id="privacy">Privasi</li>
                    <li datainternal-id="faq">FAQ</li>
                </ul>
            </div>
            <div class="content">
                <?php
                    $isShowTermsMenu = false;
                    $isShowPrivacyMenu = false;
                    $isShowFaqMenu = false;
                    switch($currurl){
    		            case "terms" : $isShowTermsMenu = true;break;
    		            case "privacy" : $isShowPrivacyMenu = true;break;
    		            default:$isShowFaqMenu = true;
    		        }
    		        include 'section_terms.php';
    		        include 'section_privacy.php';
    		        include 'section_faq.php';
                ?>
            </div>
        </div>
	</section>
</div>