    require(['jquery','cookie', 'scrollMonitor', 'hoverIntent', 'bootstrap', 'TweenMax', 'perfectScrollbar', 'domReady!'], function ($, cookie, scrollMonitor) {

        //存cookie
        //新增cookie记录菜单操作开始
        var addRecord = function (recordValue) {
            //判断是否开启打开
            var sidebarStatus = function () {
                var status = true;
                if ($(".sidebar-menu").hasClass('collapsed')) {
                    status = true;
                } else {
                    status = false;
                }
                return status;
            };

            // Sidebar Toggle

            $('a[data-toggle="sidebar"]').on('click', function (ev) {
                ev.preventDefault();
                if (sidebarStatus()) {
                    addRecord.isOpenSidebar(1);
                } else {
                    addRecord.isOpenSidebar(0);
                }
            });

            //控制开关
            function sidebarContrl(switchValue) {
                if (switchValue == "1") {
                    if (!(recordValue.$sidebarMenu.hasClass('collapsed'))) {
                        recordValue.$sidebarMenu.addClass('collapsed');
                        ps_destroy();
                        $(window).trigger('xenon.resize');
                    }
                }

            };
            //初始化
            sidebarContrl(addRecord.isOpenSidebar());
        }
        addRecord.isOpenSidebar = function (isOpenValue) {
            var isOpen = $.cookie("isOpenSidebar");
            if (isOpenValue == "1") {
                $.cookie("isOpenSidebar", 1, {expires: 10, path: "/"});
                isOpen = $.cookie("isOpenSidebar");
                return isOpen;
            } else if (isOpenValue == "0") {
                $.cookie("isOpenSidebar", 0, {expires: 10, path: "/"});
                isOpen = $.cookie("isOpenSidebar");
                return isOpen;
            }

            if (isOpen == undefined) {
                return 2;
            } else {
                return isOpen;
            }

        };
        //新增菜单图钉提示
        if (addRecord.isOpenSidebar() == 2){
            $('[data-toggle="sidebar"]').addClass('on');
        }else{
            $('[data-toggle="sidebar"]').removeClass('on');
        }
        //新增cookie记录菜单操作结束

//////////////////////////////////////////////////////////////////////
        var public_vars = public_vars || {};

        $.extend(public_vars, {

            breakpoints: {
                largescreen: [1481, -1],
                tabletscreen: [768, 1840],
                devicescreen: [420, 767],
                sdevicescreen: [0, 419]
            },

            lastBreakpoint: null
        });


        /* Main Function that will be called each time when the screen breakpoint changes */
        function resizable(breakpoint) {
            var sb_with_animation;

            // Large Screen Specific Script
            if (is('largescreen')) {

            }


            // Tablet or larger screen
            if (ismdxl()) {
            }


            // Tablet Screen Specific Script
            if (is('tabletscreen')) {
            }


            // Tablet device screen
            if (is('tabletscreen')) {
                //新增cookie记录菜单操作开始
                if (addRecord.isOpenSidebar() == 2 || addRecord.isOpenSidebar() == 1) {
                    public_vars.$sidebarMenu.addClass('collapsed');
                    ps_destroy();
                }
                //新增cookie记录菜单操作开始
            }
            // Tablet Screen Specific Script
            if (isxs()) {
            }

            $(window).trigger("resize");
            // Trigger Event
            $(window).trigger('xenon.resize');
        }


        /* Functions */

// Get current breakpoint
        function get_current_breakpoint() {
            var width = $(window).width(),
                breakpoints = public_vars.breakpoints;

            for (var breakpont_label in breakpoints) {
                var bp_arr = breakpoints[breakpont_label],
                    min = bp_arr[0],
                    max = bp_arr[1];

                if (max == -1)
                    max = width;

                if (min <= width && max >= width) {
                    return breakpont_label;
                }
            }

            return null;
        }


// Check current screen breakpoint
        function is(screen_label) {
            return get_current_breakpoint() == screen_label;
        }


// Is xs device
        function isxs() {
            return is('devicescreen') || is('sdevicescreen');
        }

// Is md or xl
        function ismdxl() {
            return is('tabletscreen') || is('largescreen');
        }


// Trigger Resizable Function
        function trigger_resizable() {
            if (public_vars.lastBreakpoint != get_current_breakpoint()) {
                public_vars.lastBreakpoint = get_current_breakpoint();
                resizable(public_vars.lastBreakpoint);
            }


            // Trigger Event (Repeated)
            $(window).trigger('xenon.resized');
        }

///////////////////////////////////////////////

        function rtl() // checks whether the content is in RTL mode
        {
            if (typeof window.isRTL == 'boolean')
                return window.isRTL;

            window.isRTL = $("html").get(0).dir == 'rtl' ? true : false;

            return window.isRTL;
        }


// Page Loader
        function show_loading_bar(options) {
            var defaults = {
                pct: 0,
                delay: 1.3,
                wait: 0,
                before: function () {
                },
                finish: function () {
                },
                resetOnEnd: true
            };

            if (typeof options == 'object')
                defaults = $.extend(defaults, options);
            else if (typeof options == 'number')
                defaults.pct = options;


            if (defaults.pct > 100)
                defaults.pct = 100;
            else if (defaults.pct < 0)
                defaults.pct = 0;

            var $ = $,
                $loading_bar = $(".xenon-loading-bar");

            if ($loading_bar.length == 0) {
                $loading_bar = $('<div class="xenon-loading-bar progress-is-hidden"><span data-pct="0"></span></div>');
                public_vars.$body.append($loading_bar);
            }

            var $pct = $loading_bar.find('span'),
                current_pct = $pct.data('pct'),
                is_regress = current_pct > defaults.pct;


            defaults.before(current_pct);

            TweenMax.to($pct, defaults.delay, {
                css: {width: defaults.pct + '%'}, delay: defaults.wait, ease: is_regress ? Expo.easeOut : Expo.easeIn,
                onStart: function () {
                    $loading_bar.removeClass('progress-is-hidden');
                },
                onComplete: function () {
                    var pct = $pct.data('pct');

                    if (pct == 100 && defaults.resetOnEnd) {
                        hide_loading_bar();
                    }

                    defaults.finish(pct);
                },
                onUpdate: function () {
                    $pct.data('pct', parseInt($pct.get(0).style.width, 10));
                }
            });
        }

        function hide_loading_bar() {
            var $ = $,
                $loading_bar = $(".xenon-loading-bar"),
                $pct = $loading_bar.find('span');

            $loading_bar.addClass('progress-is-hidden');
            $pct.width(0).data('pct', 0);
        }


        ///////////////////////////////////////////////////////////////

        $(document).ready(function () {

            // Chat Toggler
            $('a[data-toggle="chat"]').each(function (i, el) {
                $(el).on('click', function (ev) {
                    ev.preventDefault();

                    public_vars.$body.toggleClass('chat-open');

                    if ($.isFunction($.fn.perfectScrollbar)) {
                        setTimeout(function () {
                            public_vars.$chat.find('.chat_inner').perfectScrollbar('update');
                            $(window).trigger('xenon.resize');
                        }, 1);
                    }
                });
            });


            // Settings Pane Toggler
            $('a[data-toggle="settings-pane"]').each(function (i, el) {
                $(el).on('click', function (ev) {
                    ev.preventDefault();

                    var use_animation = attrDefault($(el), 'animate', false) && !isxs();

                    var scroll = {
                        top: $(document).scrollTop(),
                        toTop: 0
                    };

                    if (public_vars.$body.hasClass('settings-pane-open')) {
                        scroll.toTop = scroll.top;
                    }

                    TweenMax.to(scroll, (use_animation ? .1 : 0), {
                        top: scroll.toTop, roundProps: ['top'], ease: scroll.toTop < 10 ? null : Sine.easeOut, onUpdate: function () {
                            $(window).scrollTop(scroll.top);
                        },
                        onComplete: function () {
                            if (use_animation) {
                                // With Animation
                                public_vars.$settingsPaneIn.addClass('with-animation');

                                // Opening
                                if (!public_vars.$settingsPane.is(':visible')) {
                                    public_vars.$body.addClass('settings-pane-open');

                                    var height = public_vars.$settingsPane.outerHeight(true);

                                    public_vars.$settingsPane.css({
                                        height: 0
                                    });

                                    TweenMax.to(public_vars.$settingsPane, .25, {
                                        css: {height: height}, ease: Circ.easeInOut, onComplete: function () {
                                            public_vars.$settingsPane.css({height: ''});
                                        }
                                    });

                                    public_vars.$settingsPaneIn.addClass('visible');
                                }
                                // Closing
                                else {
                                    public_vars.$settingsPaneIn.addClass('closing');

                                    TweenMax.to(public_vars.$settingsPane, .25, {
                                        css: {height: 0}, delay: .15, ease: Power1.easeInOut, onComplete: function () {
                                            public_vars.$body.removeClass('settings-pane-open');
                                            public_vars.$settingsPane.css({height: ''});
                                            public_vars.$settingsPaneIn.removeClass('closing visible');
                                        }
                                    });
                                }
                            }
                            else {
                                // Without Animation
                                public_vars.$body.toggleClass('settings-pane-open');
                                public_vars.$settingsPaneIn.removeClass('visible');
                                public_vars.$settingsPaneIn.removeClass('with-animation');
                            }
                        }
                    });
                });
            });


            // Sidebar Toggle
            $('a[data-toggle="sidebar"]').each(function (i, el) {
                $(el).on('click', function (ev) {
                    ev.preventDefault();

                    if (public_vars.$sidebarMenu.hasClass('collapsed')) {
                        public_vars.$sidebarMenu.removeClass('collapsed');
                        ps_init();
                    }
                    else {
                        public_vars.$sidebarMenu.addClass('collapsed');
                        ps_destroy();
                    }
                    $('[data-toggle="sidebar"]').removeClass('on');
                    $(window).trigger('xenon.resize');
                });
            });


            // Mobile Menu Trigger
            $('a[data-toggle="mobile-menu"]').on('click', function (ev) {
                ev.preventDefault();

                public_vars.$mainMenu.toggleClass('mobile-is-visible');
                ps_destroy();
            });


            // Mobile Menu Trigger for Horizontal Menu
            $('a[data-toggle="mobile-menu-horizontal"]').on('click', function (ev) {
                ev.preventDefault();

                public_vars.$horizontalMenu.toggleClass('mobile-is-visible');

            });


            // Mobile Menu Trigger for Sidebar & Horizontal Menu
            $('a[data-toggle="mobile-menu-both"]').on('click', function (ev) {
                ev.preventDefault();

                public_vars.$mainMenu.toggleClass('mobile-is-visible both-menus-visible');
                public_vars.$horizontalMenu.toggleClass('mobile-is-visible both-menus-visible');

            });


            // Mobile User Info Menu Trigger
            $('a[data-toggle="user-info-menu"]').on('click', function (ev) {
                ev.preventDefault();

                public_vars.$userInfoMenu.toggleClass('mobile-is-visible');

            });


            // Mobile User Info Menu Trigger for Horizontal Menu
            $('a[data-toggle="user-info-menu-horizontal"]').on('click', function (ev) {
                ev.preventDefault();

                public_vars.$userInfoMenuHor.find('.nav.nav-userinfo').toggleClass('mobile-is-visible');

            });


            // Panel Close
            $('body').on('click', '.panel a[data-toggle="remove"]', function (ev) {
                ev.preventDefault();

                var $panel = $(this).closest('.panel'),
                    $panel_parent = $panel.parent();

                $panel.remove();

                if ($panel_parent.children().length == 0) {
                    $panel_parent.remove();
                }
            });


            // Panel Reload
            $('body').on('click', '.panel a[data-toggle="reload"]', function (ev) {
                ev.preventDefault();

                var $panel = $(this).closest('.panel');

                // This is just a simulation, nothing is going to be reloaded
                $panel.append('<div class="panel-disabled"><div class="loader-1"></div></div>');

                var $pd = $panel.find('.panel-disabled');

                setTimeout(function () {
                    $pd.fadeOut('fast', function () {
                        $pd.remove();
                    });

                }, 500 + 300 * (Math.random() * 5));
            });


            // Panel Expand/Collapse Toggle
            $('body').on('click', '.panel a[data-toggle="panel"]', function (ev) {
                ev.preventDefault();

                var $panel = $(this).closest('.panel');

                $panel.toggleClass('collapsed');
            });


            // Loading Text toggle
            $('[data-loading-text]').each(function (i, el) // Temporary for demo purpose only
            {
                var $this = $(el);

                $this.on('click', function (ev) {
                    $this.button('loading');

                    setTimeout(function () {
                        $this.button('reset');
                    }, 1800);
                });
            });


            // Popovers and tooltips
            $('[data-toggle="popover"]').each(function (i, el) {
                var $this = $(el),
                    placement = attrDefault($this, 'placement', 'right'),
                    trigger = attrDefault($this, 'trigger', 'click'),
                    popover_class = $this.get(0).className.match(/(popover-[a-z0-9]+)/i);

                $this.popover({
                    placement: placement,
                    trigger: trigger
                });

                if (popover_class) {
                    $this.removeClass(popover_class[1]);

                    $this.on('show.bs.popover', function (ev) {
                        setTimeout(function () {
                            var $popover = $this.next();
                            $popover.addClass(popover_class[1]);

                        }, 0);
                    });
                }
            });

            $('[data-toggle="tooltip"]').each(function (i, el) {
                var $this = $(el),
                    placement = attrDefault($this, 'placement', 'top'),
                    trigger = attrDefault($this, 'trigger', 'hover'),
                    tooltip_class = $this.get(0).className.match(/(tooltip-[a-z0-9]+)/i);

                $this.tooltip({
                    placement: placement,
                    trigger: trigger
                });

                if (tooltip_class) {
                    $this.removeClass(tooltip_class[1]);

                    $this.on('show.bs.tooltip', function (ev) {
                        setTimeout(function () {
                            var $tooltip = $this.next();
                            $tooltip.addClass(tooltip_class[1]);

                        }, 0);
                    });
                }
            });

        });
        ///////////////////////////////////////////////////////////////
        var setupWidgets = function () {
            // Count Anything
            /*    $("[data-from][data-to]").each(function (i, el) {
             var $el = $(el),
             sm = scrollMonitor.create(el);

             sm.fullyEnterViewport(function () {
             var opts = {
             useEasing: attrDefault($el, 'easing', true),
             useGrouping: attrDefault($el, 'grouping', true),
             separator: attrDefault($el, 'separator', ','),
             decimal: attrDefault($el, 'decimal', '.'),
             prefix: attrDefault($el, 'prefix', ''),
             suffix: attrDefault($el, 'suffix', ''),
             },
             $count = attrDefault($el, 'count', 'this') == 'this' ? $el : $el.find($el.data('count')),
             from = attrDefault($el, 'from', 0),
             to = attrDefault($el, 'to', 100),
             duration = attrDefault($el, 'duration', 2.5),
             delay = attrDefault($el, 'delay', 0),
             decimals = new String(to).match(/\.([0-9]+)/) ? new String(to).match(/\.([0-9]+)$/)[1].length : 0,
             counter = new countUp($count.get(0), from, to, decimals, duration, opts);

             setTimeout(function () {
             counter.start();
             }, delay * 1000);

             sm.destroy();
             });
             });*/


            // Fill Anything
            $("[data-fill-from][data-fill-to]").each(function (i, el) {
                var $el = $(el),
                    sm = scrollMonitor.create(el);

                sm.fullyEnterViewport(function () {
                    var fill = {
                            current: null,
                            from: attrDefault($el, 'fill-from', 0),
                            to: attrDefault($el, 'fill-to', 100),
                            property: attrDefault($el, 'fill-property', 'width'),
                            unit: attrDefault($el, 'fill-unit', '%'),
                        },
                        opts = {
                            current: fill.to, onUpdate: function () {
                                $el.css(fill.property, fill.current + fill.unit);
                            },
                            delay: attrDefault($el, 'delay', 0),
                        },
                        easing = attrDefault($el, 'fill-easing', true),
                        duration = attrDefault($el, 'fill-duration', 2.5);

                    if (easing) {
                        opts.ease = Sine.easeOut;
                    }

                    // Set starting point
                    fill.current = fill.from;

                    TweenMax.to(fill, duration, opts);

                    sm.destroy();
                });
            });


            // Todo List
            $(".xe-todo-list").on('change', 'input[type="checkbox"]', function (ev) {
                var $cb = $(this),
                    $li = $cb.closest('li');

                $li.removeClass('done');

                if ($cb.is(':checked')) {
                    $li.addClass('done');
                }
            });


            $(".xe-status-update").each(function (i, el) {
                var $el = $(el),
                    $nav = $el.find('.xe-nav a'),
                    $status_list = $el.find('.xe-body li'),
                    index = $status_list.filter('.active').index(),
                    auto_switch = attrDefault($el, 'auto-switch', 0),
                    as_interval = 0;

                if (auto_switch > 0) {
                    as_interval = setInterval(function () {
                        goTo(1);

                    }, auto_switch * 1000);

                    $el.hover(function () {
                            window.clearInterval(as_interval);
                        },
                        function () {
                            as_interval = setInterval(function () {
                                goTo(1);

                            }, auto_switch * 1000);
                            ;
                        });
                }

                function goTo(plus_one) {
                    index = (index + plus_one) % $status_list.length;

                    if (index < 0)
                        index = $status_list.length - 1;

                    var $to_hide = $status_list.filter('.active'),
                        $to_show = $status_list.eq(index);

                    $to_hide.removeClass('active');
                    $to_show.addClass('active').fadeTo(0, 0).fadeTo(320, 1);
                }

                $nav.on('click', function (ev) {
                    ev.preventDefault();

                    var plus_one = $(this).hasClass('xe-prev') ? -1 : 1;

                    goTo(plus_one);
                });
            });
        }
        $(document).ready(function () {
            if ($('.page-loading-overlay').length) {
                setTimeout(setupWidgets, 20);
            }
            else {
                setupWidgets();
            }
        });


////////////////////////////////////////////////////////////////////

        var public_vars = public_vars || {};


        $(document).ready(function () {
            // Main Vars
            public_vars.$body = $("body");
            public_vars.$pageContainer = public_vars.$body.find(".page-container");
            public_vars.$chat = public_vars.$pageContainer.find("#chat");
            public_vars.$sidebarMenu = public_vars.$pageContainer.find('.sidebar-menu');
            public_vars.$mainMenu = public_vars.$sidebarMenu.find('.main-menu');

            public_vars.$horizontalNavbar = public_vars.$body.find('.navbar.horizontal-menu');
            public_vars.$horizontalMenu = public_vars.$horizontalNavbar.find('.navbar-nav');

            public_vars.$mainContent = public_vars.$pageContainer.find('.main-content');
            public_vars.$mainFooter = public_vars.$body.find('footer.main-footer');

            public_vars.$userInfoMenuHor = public_vars.$body.find('.navbar.horizontal-menu');
            public_vars.$userInfoMenu = public_vars.$body.find('nav.navbar.user-info-navbar');

            public_vars.$settingsPane = public_vars.$body.find('.settings-pane');
            public_vars.$settingsPaneIn = public_vars.$settingsPane.find('.settings-pane-inner');

            public_vars.wheelPropagation = true; // used in Main menu (sidebar)

            public_vars.$pageLoadingOverlay = public_vars.$body.find('.page-loading-overlay');

            public_vars.defaultColorsPalette = ['#68b828', '#7c38bc', '#0e62c7', '#fcd036', '#4fcdfc', '#00b19d', '#ff6264', '#f7aa47'];

            //初始化记录菜单cookie
            addRecord(public_vars);

            // Page Loading Overlay
            if (public_vars.$pageLoadingOverlay.length) {
                // $(window).load(function () {
                public_vars.$pageLoadingOverlay.addClass('loaded');
                // });
            }

            window.onerror = function () {
                // failsafe remove loading overlay
                public_vars.$pageLoadingOverlay.addClass('loaded');
            }


            // Setup Sidebar Menu
            setup_sidebar_menu();


            // Setup Horizontal Menu
            setup_horizontal_menu();


            // Sticky Footer
            if (public_vars.$mainFooter.hasClass('sticky')) {
                stickFooterToBottom();
                $(window).on('xenon.resized', stickFooterToBottom);
            }


            // Perfect Scrollbar
            if ($.isFunction($.fn.perfectScrollbar)) {
                if (public_vars.$sidebarMenu.hasClass('fixed'))
                    ps_init();

                $(".ps-scrollbar").each(function (i, el) {
                    var $el = $(el);

                    $el.perfectScrollbar({
                        wheelPropagation: false
                    });
                });


                // Chat Scrollbar
                var $chat_inner = public_vars.$pageContainer.find('#chat .chat-inner');

                if ($chat_inner.parent().hasClass('fixed'))
                    $chat_inner.css({maxHeight: $(window).height()}).perfectScrollbar();


                // User info opening dropdown trigger PS update
                $(".user-info-navbar .dropdown:has(.ps-scrollbar)").each(function (i, el) {
                    var $scrollbar = $(this).find('.ps-scrollbar');

                    $(this).on('click', '[data-toggle="dropdown"]', function (ev) {
                        ev.preventDefault();

                        setTimeout(function () {
                            $scrollbar.perfectScrollbar('update');
                        }, 1);
                    });
                });


                // Scrollable
                $("div.scrollable").each(function (i, el) {
                    var $this = $(el),
                        max_height = parseInt(attrDefault($this, 'max-height', 200), 10);

                    max_height = max_height < 0 ? 200 : max_height;

                    $this.css({maxHeight: max_height}).perfectScrollbar({
                        wheelPropagation: true
                    });
                });
            }


            // User info search button
            var $uim_search_form = $(".user-info-menu .search-form, .nav.navbar-right .search-form");

            $uim_search_form.each(function (i, el) {
                var $uim_search_input = $(el).find('.form-control');

                $(el).on('click', '.btn', function (ev) {
                    if ($uim_search_input.val().trim().length == 0) {
                        $(el).addClass('focused');
                        setTimeout(function () {
                            $uim_search_input.focus();
                        }, 100);
                        return false;
                    }
                });

                $uim_search_input.on('blur', function () {
                    $(el).removeClass('focused');
                });
            });


            // Fixed Footer
            if (public_vars.$mainFooter.hasClass('fixed')) {
                public_vars.$mainContent.css({
                    paddingBottom: public_vars.$mainFooter.outerHeight(true)
                });
            }


            // Go to to links
            $('body').on('click', 'a[rel="go-top"]', function (ev) {
                ev.preventDefault();

                var obj = {pos: $(window).scrollTop()};

                TweenLite.to(obj, .3, {
                    pos: 0, ease: Power4.easeOut, onUpdate: function () {
                        $(window).scrollTop(obj.pos);
                    }
                });
            });


            // User info navbar equal heights
            if (public_vars.$userInfoMenu.length) {
                public_vars.$userInfoMenu.find('.user-info-menu > li').css({
                    minHeight: public_vars.$userInfoMenu.outerHeight() - 1
                });
            }


            // Autosize
            if ($.isFunction($.fn.autosize)) {
                $(".autosize, .autogrow").autosize();
            }


            // Auto hidden breadcrumbs
            $(".breadcrumb.auto-hidden").each(function (i, el) {
                var $bc = $(el),
                    $as = $bc.find('li a'),
                    collapsed_width = $as.width(),
                    expanded_width = 0;

                $as.each(function (i, el) {
                    var $a = $(el);

                    expanded_width = $a.outerWidth(true);
                    $a.addClass('collapsed').width(expanded_width);

                    $a.hover(function () {
                            $a.removeClass('collapsed');
                        },
                        function () {
                            $a.addClass('collapsed');
                        });
                });
            });


            // Close Modal on Escape Keydown
            /*        $(window).on('keydown', function (ev) {
             // Escape
             if (ev.keyCode == 27) {
             // Close opened modal
             if (public_vars.$body.hasClass('modal-open'))
             $(".modal-open .modal:visible").modal('hide');
             }
             });*/


            // Minimal Addon focus interaction
            $(".input-group.input-group-minimal:has(.form-control)").each(function (i, el) {
                var $this = $(el),
                    $fc = $this.find('.form-control');

                $fc.on('focus', function () {
                    $this.addClass('focused');
                }).on('blur', function () {
                    $this.removeClass('focused');
                });
            });


            // Spinner
            $(".input-group.spinner").each(function (i, el) {
                var $ig = $(el),
                    $dec = $ig.find('[data-type="decrement"]'),
                    $inc = $ig.find('[data-type="increment"]'),
                    $inp = $ig.find('.form-control'),

                    step = attrDefault($ig, 'step', 1),
                    min = attrDefault($ig, 'min', 0),
                    max = attrDefault($ig, 'max', 0),
                    umm = min < max;


                $dec.on('click', function (ev) {
                    ev.preventDefault();

                    var num = new Number($inp.val()) - step;

                    if (umm && num <= min) {
                        num = min;
                    }

                    $inp.val(num);
                });

                $inc.on('click', function (ev) {
                    ev.preventDefault();

                    var num = new Number($inp.val()) + step;

                    if (umm && num >= max) {
                        num = max;
                    }

                    $inp.val(num);
                });
            });


            // Timepicker
            if ($.isFunction($.fn.timepicker)) {
                $(".timepicker").each(function (i, el) {
                    var $this = $(el),
                        opts = {
                            template: attrDefault($this, 'template', false),
                            showSeconds: attrDefault($this, 'showSeconds', false),
                            defaultTime: attrDefault($this, 'defaultTime', 'current'),
                            showMeridian: attrDefault($this, 'showMeridian', true),
                            minuteStep: attrDefault($this, 'minuteStep', 15),
                            secondStep: attrDefault($this, 'secondStep', 15)
                        },
                        $n = $this.next(),
                        $p = $this.prev();

                    $this.timepicker(opts);

                    if ($n.is('.input-group-addon') && $n.has('a')) {
                        $n.on('click', function (ev) {
                            ev.preventDefault();

                            $this.timepicker('showWidget');
                        });
                    }

                    if ($p.is('.input-group-addon') && $p.has('a')) {
                        $p.on('click', function (ev) {
                            ev.preventDefault();

                            $this.timepicker('showWidget');
                        });
                    }
                });
            }


            // Colorpicker
            if ($.isFunction($.fn.colorpicker)) {
                $(".colorpicker").each(function (i, el) {
                    var $this = $(el),
                        opts = {},
                        $n = $this.next(),
                        $p = $this.prev(),

                        $preview = $this.siblings('.input-group-addon').find('.color-preview');

                    $this.colorpicker(opts);

                    if ($n.is('.input-group-addon') && $n.has('a')) {
                        $n.on('click', function (ev) {
                            ev.preventDefault();

                            $this.colorpicker('show');
                        });
                    }

                    if ($p.is('.input-group-addon') && $p.has('a')) {
                        $p.on('click', function (ev) {
                            ev.preventDefault();

                            $this.colorpicker('show');
                        });
                    }

                    if ($preview.length) {
                        $this.on('changeColor', function (ev) {

                            $preview.css('background-color', ev.color.toHex());
                        });

                        if ($this.val().length) {
                            $preview.css('background-color', $this.val());
                        }
                    }
                });
            }


            // Form Wizard
            if ($.isFunction($.fn.bootstrapWizard)) {
                $(".form-wizard").each(function (i, el) {
                    var $this = $(el),
                        $tabs = $this.find('> .tabs > li'),
                        $progress = $this.find(".progress-indicator"),
                        _index = $this.find('> ul > li.active').index();

                    // Validation
                    var checkFormWizardValidaion = function (tab, navigation, index) {
                        if ($this.hasClass('validate')) {
                            var $valid = $this.valid();

                            if (!$valid) {
                                $this.data('validator').focusInvalid();
                                return false;
                            }
                        }

                        return true;
                    };

                    // Setup Progress
                    if (_index > 0) {
                        $progress.css({width: _index / $tabs.length * 100 + '%'});
                        $tabs.removeClass('completed').slice(0, _index).addClass('completed');
                    }

                    $this.bootstrapWizard({
                        tabClass: "",
                        onTabShow: function ($tab, $navigation, index) {
                            var pct = $tabs.eq(index).position().left / $tabs.parent().width() * 100;

                            $tabs.removeClass('completed').slice(0, index).addClass('completed');
                            $progress.css({width: pct + '%'});
                        },

                        onNext: checkFormWizardValidaion,
                        onTabClick: checkFormWizardValidaion
                    });

                    $this.data('bootstrapWizard').show(_index);

                    $this.find('.pager a').on('click', function (ev) {
                        ev.preventDefault();
                    });
                });
            }


            // Slider
            if ($.isFunction($.fn.slider)) {
                $(".slider").each(function (i, el) {
                    var $this = $(el),
                        $label_1 = $('<span class="ui-label"></span>'),
                        $label_2 = $label_1.clone(),

                        orientation = attrDefault($this, 'vertical', 0) != 0 ? 'vertical' : 'horizontal',

                        prefix = attrDefault($this, 'prefix', ''),
                        postfix = attrDefault($this, 'postfix', ''),

                        fill = attrDefault($this, 'fill', ''),
                        $fill = $(fill),

                        step = attrDefault($this, 'step', 1),
                        value = attrDefault($this, 'value', 5),
                        min = attrDefault($this, 'min', 0),
                        max = attrDefault($this, 'max', 100),
                        min_val = attrDefault($this, 'min-val', 10),
                        max_val = attrDefault($this, 'max-val', 90),

                        is_range = $this.is('[data-min-val]') || $this.is('[data-max-val]'),

                        reps = 0;


                    // Range Slider Options
                    if (is_range) {
                        $this.slider({
                            range: true,
                            orientation: orientation,
                            min: min,
                            max: max,
                            values: [min_val, max_val],
                            step: step,
                            slide: function (e, ui) {
                                var min_val = (prefix ? prefix : '') + ui.values[0] + (postfix ? postfix : ''),
                                    max_val = (prefix ? prefix : '') + ui.values[1] + (postfix ? postfix : '');

                                $label_1.html(min_val);
                                $label_2.html(max_val);

                                if (fill)
                                    $fill.val(min_val + ',' + max_val);

                                reps++;
                            },
                            change: function (ev, ui) {
                                if (reps == 1) {
                                    var min_val = (prefix ? prefix : '') + ui.values[0] + (postfix ? postfix : ''),
                                        max_val = (prefix ? prefix : '') + ui.values[1] + (postfix ? postfix : '');

                                    $label_1.html(min_val);
                                    $label_2.html(max_val);

                                    if (fill)
                                        $fill.val(min_val + ',' + max_val);
                                }

                                reps = 0;
                            }
                        });

                        var $handles = $this.find('.ui-slider-handle');

                        $label_1.html((prefix ? prefix : '') + min_val + (postfix ? postfix : ''));
                        $handles.first().append($label_1);

                        $label_2.html((prefix ? prefix : '') + max_val + (postfix ? postfix : ''));
                        $handles.last().append($label_2);
                    }
                    // Normal Slider
                    else {

                        $this.slider({
                            range: attrDefault($this, 'basic', 0) ? false : "min",
                            orientation: orientation,
                            min: min,
                            max: max,
                            value: value,
                            step: step,
                            slide: function (ev, ui) {
                                var val = (prefix ? prefix : '') + ui.value + (postfix ? postfix : '');

                                $label_1.html(val);


                                if (fill)
                                    $fill.val(val);

                                reps++;
                            },
                            change: function (ev, ui) {
                                if (reps == 1) {
                                    var val = (prefix ? prefix : '') + ui.value + (postfix ? postfix : '');

                                    $label_1.html(val);

                                    if (fill)
                                        $fill.val(val);
                                }

                                reps = 0;
                            }
                        });

                        var $handles = $this.find('.ui-slider-handle');
                        //$fill = $('<div class="ui-fill"></div>');

                        $label_1.html((prefix ? prefix : '') + value + (postfix ? postfix : ''));
                        $handles.html($label_1);

                        //$handles.parent().prepend( $fill );

                        //$fill.width($handles.get(0).style.left);
                    }

                })
            }


            // $ Knob
            if ($.isFunction($.fn.knob)) {
                $(".knob").knob({
                    change: function (value) {
                    },
                    release: function (value) {
                    },
                    cancel: function () {
                    },
                    draw: function () {

                        if (this.$.data('skin') == 'tron') {

                            var a = this.angle(this.cv) // Angle
                                ,
                                sa = this.startAngle // Previous start angle
                                ,
                                sat = this.startAngle // Start angle
                                ,
                                ea // Previous end angle
                                , eat = sat + a // End angle
                                ,
                                r = 1;

                            this.g.lineWidth = this.lineWidth;

                            this.o.cursor && (sat = eat - 0.3) && (eat = eat + 0.3);

                            if (this.o.displayPrevious) {
                                ea = this.startAngle + this.angle(this.v);
                                this.o.cursor && (sa = ea - 0.3) && (ea = ea + 0.3);
                                this.g.beginPath();
                                this.g.strokeStyle = this.pColor;
                                this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, sa, ea, false);
                                this.g.stroke();
                            }

                            this.g.beginPath();
                            this.g.strokeStyle = r ? this.o.fgColor : this.fgColor;
                            this.g.arc(this.xy, this.xy, this.radius - this.lineWidth, sat, eat, false);
                            this.g.stroke();

                            this.g.lineWidth = 2;
                            this.g.beginPath();
                            this.g.strokeStyle = this.o.fgColor;
                            this.g.arc(this.xy, this.xy, this.radius - this.lineWidth + 1 + this.lineWidth * 2 / 3, 0, 2 * Math.PI, false);
                            this.g.stroke();

                            return false;
                        }
                    }
                });
            }


            // Wysiwyg Editor
            if ($.isFunction($.fn.wysihtml5)) {
                $(".wysihtml5").each(function (i, el) {
                    var $this = $(el),
                        stylesheets = attrDefault($this, 'stylesheet-url', '')

                    $(".wysihtml5").wysihtml5({
                        size: 'white',
                        stylesheets: stylesheets.split(','),
                        "html": attrDefault($this, 'html', true),
                        "color": attrDefault($this, 'colors', true),
                    });
                });
            }


            // CKeditor WYSIWYG
            if ($.isFunction($.fn.ckeditor)) {
                $(".ckeditor").ckeditor({
                    contentsLangDirection: rtl() ? 'rtl' : 'ltr'
                });
            }


            // Dropzone is prezent
            if (typeof Dropzone != 'undefined') {
                Dropzone.autoDiscover = false;

                $(".dropzone[action]").each(function (i, el) {
                    $(el).dropzone();
                });
            }


            // Tocify Table
            if ($.isFunction($.fn.tocify) && $("#toc").length) {
                $("#toc").tocify({
                    context: '.tocify-content',
                    selectors: "h2,h3,h4,h5"
                });


                var $this = $(".tocify"),
                    watcher = scrollMonitor.create($this.get(0));

                $this.width($this.parent().width());

                watcher.lock();

                watcher.stateChange(function () {
                    $($this.get(0)).toggleClass('fixed', this.isAboveViewport)
                });
            }


            // Login Form Label Focusing
            $(".login-form .form-group:has(label)").each(function (i, el) {
                var $this = $(el),
                    $label = $this.find('label'),
                    $input = $this.find('.form-control');

                $input.on('focus', function () {
                    $this.addClass('is-focused');
                });

                $input.on('keydown', function () {
                    $this.addClass('is-focused');
                });

                $input.on('blur', function () {
                    $this.removeClass('is-focused');

                    if ($input.val().trim().length > 0) {
                        $this.addClass('is-focused');
                    }
                });

                $label.on('click', function () {
                    $input.focus();
                });

                if ($input.val().trim().length > 0) {
                    $this.addClass('is-focused');
                }
            });

        });


        // Enable/Disable Resizable Event
        var wid = 0;

        $(window).resize(function () {
            clearTimeout(wid);
            wid = setTimeout(trigger_resizable, 200);
        });
        setTimeout(trigger_resizable, 200);

// Sideber Menu Setup function
        var sm_duration = .2,
            sm_transition_delay = 150;

        function setup_sidebar_menu() {
            if (public_vars.$sidebarMenu.length) {
                var $items_with_subs = public_vars.$sidebarMenu.find('li:has(> ul)'),
                    toggle_others = public_vars.$sidebarMenu.hasClass('toggle-others');

                $items_with_subs.filter('.active').addClass('expanded');

                $items_with_subs.each(function (i, el) {
                    var $li = $(el),
                        $a = $li.children('a'),
                        $sub = $li.children('ul');

                    $li.addClass('has-sub');

                    $a.on('click', function (ev) {
                        ev.preventDefault();

                        if (toggle_others) {
                            sidebar_menu_close_items_siblings($li);
                        }

                        if ($li.hasClass('expanded') || $li.hasClass('opened'))
                            sidebar_menu_item_collapse($li, $sub);
                        else
                            sidebar_menu_item_expand($li, $sub);
                    });
                });
            }
        }

        function sidebar_menu_item_expand($li, $sub) {
            if ($li.data('is-busy') || ($li.parent('.main-menu').length && public_vars.$sidebarMenu.hasClass('collapsed')))
                return;

            $li.addClass('expanded').data('is-busy', true);
            $sub.show();

            var $sub_items = $sub.children(),
                sub_height = $sub.outerHeight(),

                win_y = $(window).height(),
                total_height = $li.outerHeight(),
                current_y = public_vars.$sidebarMenu.scrollTop(),
                item_max_y = $li.position().top + current_y,
                fit_to_viewpport = public_vars.$sidebarMenu.hasClass('fit-in-viewport');

            $sub_items.addClass('is-hidden');
            $sub.height(0);


            TweenMax.to($sub, sm_duration, {
                css: {height: sub_height}, onUpdate: ps_update, onComplete: function () {
                    $sub.height('');
                }
            });

            var interval_1 = $li.data('sub_i_1'),
                interval_2 = $li.data('sub_i_2');

            window.clearTimeout(interval_1);

            interval_1 = setTimeout(function () {
                $sub_items.each(function (i, el) {
                    var $sub_item = $(el);

                    $sub_item.addClass('is-shown');
                });

                var finish_on = sm_transition_delay * $sub_items.length,
                    t_duration = parseFloat($sub_items.eq(0).css('transition-duration')),
                    t_delay = parseFloat($sub_items.last().css('transition-delay'));

                if (t_duration && t_delay) {
                    finish_on = (t_duration + t_delay) * 1000;
                }

                // In the end
                window.clearTimeout(interval_2);

                interval_2 = setTimeout(function () {
                    $sub_items.removeClass('is-hidden is-shown');

                }, finish_on);


                $li.data('is-busy', false);

            }, 0);

            $li.data('sub_i_1', interval_1),
                $li.data('sub_i_2', interval_2);
        }

        function sidebar_menu_item_collapse($li, $sub) {
            if ($li.data('is-busy'))
                return;

            var $sub_items = $sub.children();

            $li.removeClass('expanded').data('is-busy', true);
            $sub_items.addClass('hidden-item');

            TweenMax.to($sub, sm_duration, {
                css: {height: 0}, onUpdate: ps_update, onComplete: function () {
                    $li.data('is-busy', false).removeClass('opened');

                    $sub.attr('style', '').hide();
                    $sub_items.removeClass('hidden-item');

                    $li.find('li.expanded ul').attr('style', '').hide().parent().removeClass('expanded');

                    ps_update(true);
                }
            });
        }

        function sidebar_menu_close_items_siblings($li) {
            $li.siblings().not($li).filter('.expanded, .opened').each(function (i, el) {
                var $_li = $(el),
                    $_sub = $_li.children('ul');

                sidebar_menu_item_collapse($_li, $_sub);
            });
        }


// Horizontal Menu
        function setup_horizontal_menu() {
            if (public_vars.$horizontalMenu.length) {
                var $items_with_subs = public_vars.$horizontalMenu.find('li:has(> ul)'),
                    click_to_expand = public_vars.$horizontalMenu.hasClass('click-to-expand');

                if (click_to_expand) {
                    public_vars.$mainContent.add(public_vars.$sidebarMenu).on('click', function (ev) {
                        $items_with_subs.removeClass('hover');
                    });
                }

                $items_with_subs.each(function (i, el) {
                    var $li = $(el),
                        $a = $li.children('a'),
                        $sub = $li.children('ul'),
                        is_root_element = $li.parent().is('.navbar-nav');

                    $li.addClass('has-sub');

                    // Mobile Only
                    $a.on('click', function (ev) {
                        if (isxs()) {
                            ev.preventDefault();

                            // Automatically will toggle other menu items in mobile view
                            if (true) {
                                sidebar_menu_close_items_siblings($li);
                            }

                            if ($li.hasClass('expanded') || $li.hasClass('opened'))
                                sidebar_menu_item_collapse($li, $sub);
                            else
                                sidebar_menu_item_expand($li, $sub);
                        }
                    });

                    // Click To Expand
                    if (click_to_expand) {
                        $a.on('click', function (ev) {
                            ev.preventDefault();

                            if (isxs())
                                return;

                            // For parents only
                            if (is_root_element) {
                                $items_with_subs.filter(function (i, el) {
                                    return $(el).parent().is('.navbar-nav');
                                }).not($li).removeClass('hover');
                                $li.toggleClass('hover');
                            }
                            // Sub menus
                            else {
                                var sub_height;

                                // To Expand
                                if ($li.hasClass('expanded') == false) {
                                    $li.addClass('expanded');
                                    $sub.addClass('is-visible');

                                    sub_height = $sub.outerHeight();

                                    $sub.height(0);

                                    TweenLite.to($sub, .15, {
                                        css: {height: sub_height}, ease: Sine.easeInOut, onComplete: function () {
                                            $sub.attr('style', '');
                                        }
                                    });

                                    // Hide Existing in the list
                                    $li.siblings().find('> ul.is-visible').not($sub).each(function (i, el) {
                                        var $el = $(el);

                                        sub_height = $el.outerHeight();

                                        $el.removeClass('is-visible').height(sub_height);
                                        $el.parent().removeClass('expanded');

                                        TweenLite.to($el, .15, {
                                            css: {height: 0}, onComplete: function () {
                                                $el.attr('style', '');
                                            }
                                        });
                                    });
                                }
                                // To Collapse
                                else {
                                    sub_height = $sub.outerHeight();

                                    $li.removeClass('expanded');
                                    $sub.removeClass('is-visible').height(sub_height);
                                    TweenLite.to($sub, .15, {
                                        css: {height: 0}, onComplete: function () {
                                            $sub.attr('style', '');
                                        }
                                    });
                                }
                            }
                        });
                    }
                    // Hover To Expand
                    else {
                        $li.hoverIntent({
                            over: function () {
                                if (isxs())
                                    return;

                                if (is_root_element) {
                                    $li.addClass('hover');
                                }
                                else {
                                    $sub.addClass('is-visible');
                                    sub_height = $sub.outerHeight();

                                    $sub.height(0);

                                    TweenLite.to($sub, .25, {
                                        css: {height: sub_height}, ease: Sine.easeInOut, onComplete: function () {
                                            $sub.attr('style', '');
                                        }
                                    });
                                }
                            },
                            out: function () {
                                if (isxs())
                                    return;

                                if (is_root_element) {
                                    $li.removeClass('hover');
                                }
                                else {
                                    sub_height = $sub.outerHeight();

                                    $li.removeClass('expanded');
                                    $sub.removeClass('is-visible').height(sub_height);
                                    TweenLite.to($sub, .25, {
                                        css: {height: 0}, onComplete: function () {
                                            $sub.attr('style', '');
                                        }
                                    });
                                }
                            },
                            timeout: 200,
                            interval: is_root_element ? 10 : 100
                        });
                    }
                });
            }
        }


        function stickFooterToBottom() {
            public_vars.$mainFooter.add(public_vars.$mainContent).add(public_vars.$sidebarMenu).attr('style', '');

            if (isxs())
                return false;

            if (public_vars.$mainFooter.hasClass('sticky')) {
                var win_height = $(window).height(),
                    footer_height = public_vars.$mainFooter.outerHeight(true),
                    main_content_height = public_vars.$mainFooter.position().top + footer_height,
                    main_content_height_only = main_content_height - footer_height,
                    extra_height = public_vars.$horizontalNavbar.outerHeight();


                if (win_height > main_content_height - parseInt(public_vars.$mainFooter.css('marginTop'), 10)) {
                    public_vars.$mainFooter.css({
                        marginTop: win_height - main_content_height - extra_height
                    });
                }
            }
        }


// Perfect scroll bar functions by Arlind Nushi
        function ps_update(destroy_init) {
            if (isxs())
                return;

            if ($.isFunction($.fn.perfectScrollbar)) {
                if (public_vars.$sidebarMenu.hasClass('collapsed')) {
                    return;
                }

                public_vars.$sidebarMenu.find('.sidebar-menu-inner').perfectScrollbar('update');

                if (destroy_init) {
                    ps_destroy();
                    ps_init();
                }
            }
        }


        function ps_init() {
            if (isxs())
                return;

            if ($.isFunction($.fn.perfectScrollbar)) {
                if (public_vars.$sidebarMenu.hasClass('collapsed') || !public_vars.$sidebarMenu.hasClass('fixed')) {
                    return;
                }

                public_vars.$sidebarMenu.find('.sidebar-menu-inner').perfectScrollbar({
                    wheelSpeed: 2,
                    wheelPropagation: public_vars.wheelPropagation
                });
            }
        }

        function ps_destroy() {
            if ($.isFunction($.fn.perfectScrollbar)) {
                public_vars.$sidebarMenu.find('.sidebar-menu-inner').perfectScrollbar('destroy');
            }
        }


// Element Attribute Helper
        function attrDefault($el, data_var, default_val) {
            if (typeof $el.data(data_var) != 'undefined') {
                return $el.data(data_var);
            }

            return default_val;
        }


// Test function
        function callback_test() {
            alert("Callback function executed! No. of arguments: " + arguments.length + "\n\nSee console log for outputed of the arguments.");

            console.log(arguments);
        }


// Date Formatter
        function date(format, timestamp) {
            //  discuss at: http://phpjs.org/functions/date/
            // original by: Carlos R. L. Rodrigues (http://www.jsfromhell.com)
            // original by: gettimeofday
            //  parts by: Peter-Paul Koch (http://www.quirksmode.org/js/beat.html)
            // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // improved by: MeEtc (http://yass.meetcweb.com)
            // improved by: Brad Touesnard
            // improved by: Tim Wiel
            // improved by: Bryan Elliott
            // improved by: David Randall
            // improved by: Theriault
            // improved by: Theriault
            // improved by: Brett Zamir (http://brett-zamir.me)
            // improved by: Theriault
            // improved by: Thomas Beaucourt (http://www.webapp.fr)
            // improved by: JT
            // improved by: Theriault
            // improved by: Rafał Kukawski (http://blog.kukawski.pl)
            // improved by: Theriault
            //  input by: Brett Zamir (http://brett-zamir.me)
            //  input by: majak
            //  input by: Alex
            //  input by: Martin
            //  input by: Alex Wilson
            //  input by: Haravikk
            // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // bugfixed by: majak
            // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
            // bugfixed by: Brett Zamir (http://brett-zamir.me)
            // bugfixed by: omid (http://phpjs.org/functions/380:380#comment_137122)
            // bugfixed by: Chris (http://www.devotis.nl/)
            //      note: Uses global: php_js to store the default timezone
            //      note: Although the function potentially allows timezone info (see notes), it currently does not set
            //      note: per a timezone specified by date_default_timezone_set(). Implementers might use
            //      note: this.php_js.currentTimezoneOffset and this.php_js.currentTimezoneDST set by that function
            //      note: in order to adjust the dates in this function (or our other date functions!) accordingly
            //   example 1: date('H:m:s \\m \\i\\s \\m\\o\\n\\t\\h', 1062402400);
            //   returns 1: '09:09:40 m is month'
            //   example 2: date('F j, Y, g:i a', 1062462400);
            //   returns 2: 'September 2, 2003, 2:26 am'
            //   example 3: date('Y W o', 1062462400);
            //   returns 3: '2003 36 2003'
            //   example 4: x = date('Y m d', (new Date()).getTime()/1000);
            //   example 4: (x+'').length == 10 // 2009 01 09
            //   returns 4: true
            //   example 5: date('W', 1104534000);
            //   returns 5: '53'
            //   example 6: date('B t', 1104534000);
            //   returns 6: '999 31'
            //   example 7: date('W U', 1293750000.82); // 2010-12-31
            //   returns 7: '52 1293750000'
            //   example 8: date('W', 1293836400); // 2011-01-01
            //   returns 8: '52'
            //   example 9: date('W Y-m-d', 1293974054); // 2011-01-02
            //   returns 9: '52 2011-01-02'

            var that = this;
            var jsdate, f;
            // Keep this here (works, but for code commented-out below for file size reasons)
            // var tal= [];
            var txt_words = [
                'Sun', 'Mon', 'Tues', 'Wednes', 'Thurs', 'Fri', 'Satur',
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
            ];
            // trailing backslash -> (dropped)
            // a backslash followed by any character (including backslash) -> the character
            // empty string -> empty string
            var formatChr = /\\?(.?)/gi;
            var formatChrCb = function (t, s) {
                return f[t] ? f[t]() : s;
            };
            var _pad = function (n, c) {
                n = String(n);
                while (n.length < c) {
                    n = '0' + n;
                }
                return n;
            };
            f = {
                // Day
                d: function () {
                    // Day of month w/leading 0; 01..31
                    return _pad(f.j(), 2);
                },
                D: function () {
                    // Shorthand day name; Mon...Sun
                    return f.l()
                        .slice(0, 3);
                },
                j: function () {
                    // Day of month; 1..31
                    return jsdate.getDate();
                },
                l: function () {
                    // Full day name; Monday...Sunday
                    return txt_words[f.w()] + 'day';
                },
                N: function () {
                    // ISO-8601 day of week; 1[Mon]..7[Sun]
                    return f.w() || 7;
                },
                S: function () {
                    // Ordinal suffix for day of month; st, nd, rd, th
                    var j = f.j();
                    var i = j % 10;
                    if (i <= 3 && parseInt((j % 100) / 10, 10) == 1) {
                        i = 0;
                    }
                    return ['st', 'nd', 'rd'][i - 1] || 'th';
                },
                w: function () {
                    // Day of week; 0[Sun]..6[Sat]
                    return jsdate.getDay();
                },
                z: function () {
                    // Day of year; 0..365
                    var a = new Date(f.Y(), f.n() - 1, f.j());
                    var b = new Date(f.Y(), 0, 1);
                    return Math.round((a - b) / 864e5);
                },

                // Week
                W: function () {
                    // ISO-8601 week number
                    var a = new Date(f.Y(), f.n() - 1, f.j() - f.N() + 3);
                    var b = new Date(a.getFullYear(), 0, 4);
                    return _pad(1 + Math.round((a - b) / 864e5 / 7), 2);
                },

                // Month
                F: function () {
                    // Full month name; January...December
                    return txt_words[6 + f.n()];
                },
                m: function () {
                    // Month w/leading 0; 01...12
                    return _pad(f.n(), 2);
                },
                M: function () {
                    // Shorthand month name; Jan...Dec
                    return f.F()
                        .slice(0, 3);
                },
                n: function () {
                    // Month; 1...12
                    return jsdate.getMonth() + 1;
                },
                t: function () {
                    // Days in month; 28...31
                    return (new Date(f.Y(), f.n(), 0))
                        .getDate();
                },

                // Year
                L: function () {
                    // Is leap year?; 0 or 1
                    var j = f.Y();
                    return j % 4 === 0 & j % 100 !== 0 | j % 400 === 0;
                },
                o: function () {
                    // ISO-8601 year
                    var n = f.n();
                    var W = f.W();
                    var Y = f.Y();
                    return Y + (n === 12 && W < 9 ? 1 : n === 1 && W > 9 ? -1 : 0);
                },
                Y: function () {
                    // Full year; e.g. 1980...2010
                    return jsdate.getFullYear();
                },
                y: function () {
                    // Last two digits of year; 00...99
                    return f.Y()
                        .toString()
                        .slice(-2);
                },

                // Time
                a: function () {
                    // am or pm
                    return jsdate.getHours() > 11 ? 'pm' : 'am';
                },
                A: function () {
                    // AM or PM
                    return f.a()
                        .toUpperCase();
                },
                B: function () {
                    // Swatch Internet time; 000..999
                    var H = jsdate.getUTCHours() * 36e2;
                    // Hours
                    var i = jsdate.getUTCMinutes() * 60;
                    // Minutes
                    // Seconds
                    var s = jsdate.getUTCSeconds();
                    return _pad(Math.floor((H + i + s + 36e2) / 86.4) % 1e3, 3);
                },
                g: function () {
                    // 12-Hours; 1..12
                    return f.G() % 12 || 12;
                },
                G: function () {
                    // 24-Hours; 0..23
                    return jsdate.getHours();
                },
                h: function () {
                    // 12-Hours w/leading 0; 01..12
                    return _pad(f.g(), 2);
                },
                H: function () {
                    // 24-Hours w/leading 0; 00..23
                    return _pad(f.G(), 2);
                },
                i: function () {
                    // Minutes w/leading 0; 00..59
                    return _pad(jsdate.getMinutes(), 2);
                },
                s: function () {
                    // Seconds w/leading 0; 00..59
                    return _pad(jsdate.getSeconds(), 2);
                },
                u: function () {
                    // Microseconds; 000000-999000
                    return _pad(jsdate.getMilliseconds() * 1000, 6);
                },

                // Timezone
                e: function () {
                    // Timezone identifier; e.g. Atlantic/Azores, ...
                    // The following works, but requires inclusion of the very large
                    // timezone_abbreviations_list() function.
                    /*              return that.date_default_timezone_get();
                     */
                    throw 'Not supported (see source code of date() for timezone on how to add support)';
                },
                I: function () {
                    // DST observed?; 0 or 1
                    // Compares Jan 1 minus Jan 1 UTC to Jul 1 minus Jul 1 UTC.
                    // If they are not equal, then DST is observed.
                    var a = new Date(f.Y(), 0);
                    // Jan 1
                    var c = Date.UTC(f.Y(), 0);
                    // Jan 1 UTC
                    var b = new Date(f.Y(), 6);
                    // Jul 1
                    // Jul 1 UTC
                    var d = Date.UTC(f.Y(), 6);
                    return ((a - c) !== (b - d)) ? 1 : 0;
                },
                O: function () {
                    // Difference to GMT in hour format; e.g. +0200
                    var tzo = jsdate.getTimezoneOffset();
                    var a = Math.abs(tzo);
                    return (tzo > 0 ? '-' : '+') + _pad(Math.floor(a / 60) * 100 + a % 60, 4);
                },
                P: function () {
                    // Difference to GMT w/colon; e.g. +02:00
                    var O = f.O();
                    return (O.substr(0, 3) + ':' + O.substr(3, 2));
                },
                T: function () {
                    // Timezone abbreviation; e.g. EST, MDT, ...
                    // The following works, but requires inclusion of the very
                    // large timezone_abbreviations_list() function.
                    /*              var abbr, i, os, _default;
                     if (!tal.length) {
                     tal = that.timezone_abbreviations_list();
                     }
                     if (that.php_js && that.php_js.default_timezone) {
                     _default = that.php_js.default_timezone;
                     for (abbr in tal) {
                     for (i = 0; i < tal[abbr].length; i++) {
                     if (tal[abbr][i].timezone_id === _default) {
                     return abbr.toUpperCase();
                     }
                     }
                     }
                     }
                     for (abbr in tal) {
                     for (i = 0; i < tal[abbr].length; i++) {
                     os = -jsdate.getTimezoneOffset() * 60;
                     if (tal[abbr][i].offset === os) {
                     return abbr.toUpperCase();
                     }
                     }
                     }
                     */
                    return 'UTC';
                },
                Z: function () {
                    // Timezone offset in seconds (-43200...50400)
                    return -jsdate.getTimezoneOffset() * 60;
                },

                // Full Date/Time
                c: function () {
                    // ISO-8601 date.
                    return 'Y-m-d\\TH:i:sP'.replace(formatChr, formatChrCb);
                },
                r: function () {
                    // RFC 2822
                    return 'D, d M Y H:i:s O'.replace(formatChr, formatChrCb);
                },
                U: function () {
                    // Seconds since UNIX epoch
                    return jsdate / 1000 | 0;
                }
            };

            this.date = function (format, timestamp) {
                that = this;
                jsdate = (timestamp === undefined ? new Date() : // Not provided
                        (timestamp instanceof Date) ? new Date(timestamp) : // JS Date()
                            new Date(timestamp * 1000) // UNIX timestamp (auto-convert to int)
                );
                return format.replace(formatChr, formatChrCb);
            };
            return this.date(format, timestamp);
        }

        $(document).on('init.dt', function (e, settings) {
            $(window).trigger('xenon.resized');
        });

        // 帮助说明自动添加帮助按钮函数
        var helpExplainFun = function(){
            // 添加DOM结构
            var helpExplainAddDom = function(domClass){
                var objNewDom = $('<span>',{'class':'help-explain-btn pull-right'});
                objNewDom.html("<i class='fa fa-question-circle'></i>帮助说明").on('click', function(){
                    helpExplainClick(domClass);
                });
                // 点击帮助说明中按钮关闭帮助说明块
                domClass.children('.close').on('click', function(){
                    helpExplainClick(domClass);
                });
                if(domClass.parents('.main-content').children().hasClass('three-level-menu')){
                    $(".three-level-menu").append(objNewDom);
                }else{
                    var objNewDiv = $('<div>',{'class':'three-level-menu clearfix'});
                    objNewDiv.html(objNewDom);
                    $(".main-content nav").after(objNewDiv);
                }
            };
            // 点击帮助按钮触发事件
            var helpExplainClick = function(clickVal){
                var conVal = clickVal.parents().data('help-con') == 'conTrue';
                if(conVal){
                    clickVal.parents().find('div[data-help-con = "conTrue"]').toggleClass('hide');
                }else{
                    clickVal.toggleClass('hide');
                }
            };
            var foundVal = $("div[data-help-btn = 'btnTrue']");
            if(foundVal.length > 0){
                helpExplainAddDom(foundVal);
            }
        };
        helpExplainFun();

        // return this;

    });



