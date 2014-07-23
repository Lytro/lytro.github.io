var Footer = Class.create({

    initialize: function() {

        // vars
        this.name = "Footer";
        this.display = $j("#footer");
        this.form = $j('#newsletter-signup-form');
        this.emailTextField = $j('.email-text');
        this.countryDropDown = $j('.country-dropdown');
        this.signupBtn = $j('.submit-btn');
        this.errorText = $j('.errorMessage');
        this.loadingAnimation = $j('.cover');
        this.thankyouText = $j('.thank-you');

        this.formOpen = false;

        this.checkBrowser();
        //this.preventEnterKey();
        this.focusEvents();
        this.initForm();
    },

    // functions

    checkBrowser: function () {
        // Firefox vertically aligns the text in dropdowns differently than chrome and safari
        if ($j.browser.mozilla) {
          this.countryDropDown.css({'padding-top': '6px', 'padding-left': '7px'});
        }
    },

    preventEnterKey: function () {
        $j(document).keypress(
        function(event){
            if (event.which == '13') {
                event.preventDefault();
            }
        });
    },

    focusEvents: function () {
        var that = this;

        $j(document).mouseup(function (e) {
            var container = $j(that.form);

            if (!container.is(e.target) // if the target of the click isn't the container...
                && container.has(e.target).length === 0) // ... nor a descendant of the container
            {
                that.closeForm();
            }
        });
    },

    initForm: function () {
        var that = this;

        var u = 'c17b6faf056b275544863ecdd';
        var id = '294fa9d70f';
        var url = 'http://lytro.us2.list-manage1.com/subscribe/post?u=' + u + '&id=' + id;

        $j(this.form).ajaxChimp({
            url: url,
            scope: this,
            callback: that.onSubmitResponse
        });

        // set items to alpha 0
        TweenMax.set(this.countryDropDown, { alpha:0 });
        TweenMax.set(this.signupBtn, { alpha:0 });

        // on email textfield select, show country drop down and submit button
        $j(this.emailTextField).click(function (){
            that.openForm();
        });

        // bind submit button click to show processing animation
        this.signupBtn.click(function(){
            that.showLoading();
        });
    },

    openForm: function () {

        if (!this.formOpen) {
            TweenMax.set(this.countryDropDown, { y:50 });
            TweenMax.set(this.signupBtn, { y:50 });

            TweenMax.to(this.countryDropDown, 0.5, { y:0, autoAlpha:1 });
            TweenMax.to(this.signupBtn, 0.5, { y:0, autoAlpha:1, delay:0.1 });
        }
        this.formOpen = true;
    },

    closeForm: function () {
        this.formOpen = false;
        TweenMax.to(this.countryDropDown, 0.5, { autoAlpha:0 });
        TweenMax.to(this.signupBtn, 0.5, { autoAlpha:0 });
        $j(this.emailTextField).val('');
        $j(this.countryDropDown).val($j(".country-dropdown option:first").val());
    },

    closeFormOnSuccess: function () {
        this.formOpen = false;
        TweenMax.to(this.countryDropDown, 0.5, { autoAlpha:0 });
        TweenMax.to(this.signupBtn, 0.5, { autoAlpha:0 });
        TweenMax.to(this.emailTextField, 0.5, { autoAlpha:0 });

        TweenMax.set(this.thankyouText, { alpha:0 })
        TweenMax.to(this.thankyouText, 0.2, { autoAlpha:1 });

        $j(this.emailTextField).val('');
        $j(this.countryDropDown).val($j(".country-dropdown option:first").val());
    },

    onSubmitResponse: function (resp) {
        //console.log(resp);

        if (resp.result === 'error') {
            if (resp.msg.substr(0,7) === 'Invalid') {
                this.scope.showError(1, "Invalid email address.");
            } else
            if (resp.msg.substr(0,1) === '0') {
                this.scope.showError(1, "Invalid email address.");
            } else
            if (resp.msg.substr(0,2) === '21') {
                this.scope.showError(2, "Please select your country.");
            } else {
                this.scope.showError(2, resp.msg);
            }
        }

        if (resp.result === 'success') {
            this.scope.hideLoading();
            this.scope.closeFormOnSuccess();
            //this.scope.showError(0, "Success");
        }
    },

    showLoading: function () {
        TweenMax.set(this.loadingAnimation, { alpha:0 });
        TweenMax.to(this.loadingAnimation, 0.4, { autoAlpha:1 });
    },

    hideLoading: function () {
        TweenMax.to(this.loadingAnimation, 0.4, { autoAlpha:0 });
    },

    showError: function (whichTextField, message) {
        //console.log(message);

        var that = this;

        that.hideLoading();

        TweenMax.killTweensOf(this.errorText);

        TweenMax.set(this.errorText, { alpha:0, y:50 });
        this.errorText.html(message);
        TweenMax.to(this.errorText, 0.5, { alpha:1, y:0, onComplete:function(){
            TweenMax.to(that.errorText, 0.5, { alpha:0, delay:2,onComplete:function (){

                $j(that.emailTextField).removeClass('errorBorder');
                $j(that.countryDropDown).removeClass('errorBorder');

                if (whichTextField === 0) {
                    that.closeFormOnSuccess();
                }

            } });
        }  });

        if (whichTextField === 1) {
            $j(this.emailTextField).addClass('errorBorder');
        }

        if (whichTextField === 2) {
            $j(this.countryDropDown).addClass('errorBorder');
        }
    }
});