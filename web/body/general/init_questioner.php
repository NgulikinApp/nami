<div class="questioner"></div>
<div class="questionerContainer">
	<div class="questionerHeader">
        <center><span id="askUsText">Tanya kami</span></center>
        <div class="closeIcon" id="closeButtonQuestioner"></div>
    </div>
    <div class="questionerBody">
        <div class="questionerBodySubText">Nama</div>
        <div class="questionerBodySubInput">
            <input type="text" id="nameQuestion" class="inputQuestioner"/>
        </div>
        <div class="questionerBodySubText">Email</div>
        <div class="questionerBodySubInput">
            <input type="text" id="emailQuestion" class="inputQuestioner"/>
        </div>
			<div class="questionerBodySubText">Apa yang ingin Kamu tanyakan?</div>
       	<div class="questionerBodySubInput">
            <textarea id="descQuestion" class="inputQuestioner" rows="4"></textarea>
        </div>
	    <div class="questionerBodySubText">Lampiran</div>
       	<div class="questionerBodySubInput">
            <div class="questionerBodySubContent">
                <div class="questionerBodySubBox">
	                <input type="file" name="fileQuestioner[]" id="fileQuestioner" class="inputfile" />
					<label for="fileQuestioner">
                       <svg width="20" height="17" viewBox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"/></svg>
                       <span id="namefile">Choose a file&hellip;</span>
	                </label>
	             </div>
	          </div>
	      </div>
	   	<div class="questionerBodySub">
	        <input type="button" id="buttonQuestionerSend" value="KIRIM"/>
	        <input type="button" id="buttonQuestionerCancel" value="BATAL"/>
	    </div>
	</div>
</div>