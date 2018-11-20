<div class="home_container">
	<section class="container">
		<div id="layer-signin-cont">
		    <input type="hidden" class="signFlag" value="1"/>
    		<div class="grid-signin-header">
    			<div class="grid-signup-header-icon"></div>
    		</div>
    		<div class="grid-signin-body">
    	        <div class="signinBodySubHead">
    				Tanya kami apa saja
    			</div>
    			<div class="signinBodySub">
            		<input type="text" id="nameQuestion" class="inputSignin" placeholder="Nama Lengkap"/>
            		<i class="fa fa-user"></i>
            	</div>
    			<div class="signinBodySub">
            		<input type="text" id="emailQuestion" class="inputSignin" placeholder="Email"/>
            		<i class="fa fa-book"></i>
            	</div>
            	<div class="signinBodySub">
            		<textarea class="inputSignin" id="descQuestion" placeholder="Apa yang ingin kamu tanyakan?"></textarea>
            		<i class="fa fa-question-circle"></i>
            	</div>
            	<div class="signinBodySub questionerBodySubBox" style="margin-top:30px;">
            		<input type="file" name="fileQuestioner[]" id="fileQuestioner" class="inputfile" />
					<label for="fileQuestioner">
                       <svg id="questionsvg" width="20" height="17" viewBox="0 0 20 17">
                           <path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"/>
                       </svg>
                       <span id="namefile" style="font-size: 13px;">Choose a file&hellip;</span>
	                </label>
            	</div>
            	<div style="padding: 5px;">
            	    <span class="error_message"></span>
            	</div>
            	<div class="signinBodySub" style="padding: 0px;">
                    <input type="button" id="buttonSignIn" value="Kirim"/>
            	</div>
    		</div>
		</div>
	</section>
</div>