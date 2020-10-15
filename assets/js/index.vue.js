
var billerTypes = [
    { key: '1', value: 'Supplier' },
    { key: '2', value: 'Distributor' },
    { key: '3', value: 'Landlord' },
    { key: '4', value: 'Retail' },
    { key: '5', value: 'Contractor' },
];

var suppliers = [
    { key: '1', value: 'Retail A' },
    { key: '2', value: 'Retail B' },
    { key: '3', value: 'Retail C' }
];

var sites = [
    { id: 7, name: "192 Sloan Center, Porto Formoso, 9625-414, Ilha de São Miguel, Malaysia", url: "assets/images/electricity.png" },
    { id: 11, name: "1743 Carpenter Alley, Smithers, P3N, British Columbia, Canada", url: "assets/images/gas.png" },
    { id: 13, name: "7 Gulseth Center, Pedrulheira, 2430-328, Leiria, USA", url: "assets/images/water.png" },
    { id: 17, name: "19643 Express Point, Norrköping, 602 24, Östergötland, New Zealand", url: "assets/images/electricity.png" },
    { id: 19, name: "2 Kingsford Terrace, Santa Cruz da Graciosa, 9880-324, Ilha da Graciosa, Singapore", url: "assets/images/gas.png" },
    { id: 23, name: "31999 Prairieview Street, Bergerac, 24111 CEDEX, Aquitaine, France", url: "assets/images/water.png" },
    { id: 29, name: "2 Sugar Way, La Rochelle, 17004 CEDEX 1, Poitou-Charentes, Australia", url: "assets/images/electricity.png" },
    { id: 31, name: "8382 Mendota Junction, Igreja, 5100-825, Viseu, Portugal", url: "assets/images/gas.png" },
    { id: 37, name: "945 Lunder Pass, Ferrol, 15490, Galicia, Spain", url: "assets/images/water.png" },
    { id: 41, name: "0 Sullivan Lane, Marston, ST20, England, United Kingdom", url: "assets/images/electricity.png" },
    { id: 43, name: "1 Marquette Parkway, Ludvika, 771 55, Dalarna, Sweden", url: "assets/images/gas.png" },
    { id: 47, name: "4847 Sugar Court, Marston, ST20, England, Great Britain", url: "assets/images/water.png" },
    { id: 51, name: "4847 Sugar Court, Marston, ST20, Phuket, Thailand", url: "assets/images/electricity.png" },
    { id: 56, name: "1 Marquette Parkway, Ludvika, 771 55, Hong Kong", url: "assets/images/gas.png" },
    { id: 58, name: "7 Gulseth Center, Pedrulheira, 2430-328, Leiria, Brazil", url: "assets/images/water.png" },
    { id: 65, name: "2 Sugar Way, La Rochelle, 17004 CEDEX 1, Chenai, India", url: "assets/images/electricity.png" },
];

var buyers = [
    { key: '1', value: 'Customer A' },
    { key: '2', value: 'Customer B' },
    { key: '3', value: 'Customer C' }
];

var billJson = {
    billerType: '',
    hasBillerTypeError: false,
    supplier: '',
    hasSupplierError: false,
    site: '',
    hasSiteError: false,
    buyer: '',
    hasBuyerError: false,
    abn: '',
    issueDate: '',
    dueDate: '',
    startDate: '',
    endDate: '',
    accountNumber: '',
    invoiceNumber: '',
    metadata: [
        {
            mandatory: false,
            startDate: '',
            endDate: '',
            name: '',
            product: '',
            quantity: '',
            price: '',
            total: '',
        },
        {
            mandatory: false,
            startDate: '',
            endDate: '',
            name: '',
            product: '',
            quantity: '',
            price: '',
            total: '',
        },
        {
            mandatory: false,
            startDate: '',
            endDate: '',
            name: '',
            product: '',
            quantity: '',
            price: '',
            total: '',
        },
		{
            mandatory: false,
            startDate: '',
            endDate: '',
            name: '',
            product: '',
            quantity: '',
            price: '',
            total: '',
        },
		{
            mandatory: false,
            startDate: '',
            endDate: '',
            name: '',
            product: '',
            quantity: '',
            price: '',
            total: '',
        },
        {
            mandatory: true,
            startDate: '',
            endDate: '',
            name: 'TotalCharge',
            product: '',
            quantity: '',
            price: '',
            total: '',
        },
        {
            mandatory: true,
            startDate: '',
            endDate: '',
            name: 'GST',
            product: '',
            quantity: '',
            price: '',
            total: '',
        },
        {
            mandatory: true,
            startDate: '',
            endDate: '',
            name: 'TotalAmountDue',
            product: '',
            quantity: '',
            price: '',
            total: '',
        }
    ],
};


Vue.use(VueLoaders);

Vue.filter('formatShortDate', function (value) {
    if (value) {
        return moment(String(value)).format('D MMM YYYY');
    }
});

Vue.filter('formatMetadata', function (value) {
    if (value) {
        var metadata = value;

        for (var i = 0; i < metadata.length; i++) {
            if (metadata[i].startDate)
                metadata[i].startDate = moment(metadata[i].startDate).format('D MMM YYYY');

            if (metadata[i].endDate)
                metadata[i].endDate = moment(metadata[i].endDate).format('D MMM YYYY');
        }

        return metadata;
    }
});


Vue.component('invoice-input-component', {
    props: {

    },
    template: '#bill-input-template',
    data: function () {
        var vm = this;

        return {

        }
    }
});


var nav = new Vue({
    el: '#nav',
    data: function () {
        return {
            login: false,
            loginLogoutText: 'Login',
            welcomeText: '',
            id: ""
        }
    },
    methods: {
        doLoginLogout: function () {
            var vm = this;

            if (vm.login) {
                vm.loginLogoutText = "Login";
                vm.login = false;
                vm.welcomeText = '';
            }
            else {
                vm.loginLogoutText = "Logout";
                vm.login = true;

                let id = vm.makeid();
                vm.id = id;
                vm.welcomeText = 'Hi User#' + id + '!';
            }
        },
        makeid: function () {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for (var i = 0; i < 5; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));

            return text;
        }
    }

});

var app = new Vue({
    el: '#app',
    components: {
        'vuejs-datepicker': vuejsDatepicker
    },
    data: function () {
        return {
            isLoading: '',
            message: 'Welcome Buddy!',
            query: '',
            bill: billJson,
            sites: sites,
            billerTypes: billerTypes,
            suppliers: suppliers,
            buyers: buyers
        }
    },
    created: function () {
        var vm = this;

        vm.isLoading = true;
        vm.bill = billJson;
    },
    mounted: function () {
        var vm = this;

        setTimeout(function () {
            vm.isLoading = false;

        }, 1000);

        setTimeout(function () {
            $('[data-toggle="tooltip"]').tooltip();

            // vm.autocomplete = new google.maps.places.Autocomplete(
            //     (vm.$refs.autocomplete),
            //     { types: ['geocode'] }
            // );

            // vm.autocomplete.addListener('place_changed', () => {
            //     let place = vm.autocomplete.getPlace();
            //     let ac = place.address_components;
            //     let lat = place.geometry.location.lat();
            //     let lon = place.geometry.location.lng();
            //     let city = ac[0]["short_name"];

            //     vm.bill.site = place.formatted_address;
            // });
        }, 3000);

    },
    computed: {

    },
    methods: {
        customShortDateFormatter: function (date) {
            return moment(date).format('D MMM YYYY');
        },
        submitBillForm: function () {
            var vm = this;

            vm.validateBillSite();
            vm.validateBillerType();
            vm.validateBillSupplier();
            vm.validateBillBuyer();

            if (!vm.bill.hasSiteError &&
                !vm.bill.hasBillerTypeError &&
                !vm.bill.hasSupplierError &&
                !vm.bill.hasBuyerError) {

                var bill = JSON.stringify(vm.bill);

                $('.modal-body').html(bill);

                $('#submit-modal').modal('show');
                
                $('#submit-modal').on('shown.bs.modal', function() {  $('[data-toggle="tooltip"]').tooltip(); });
            }

        },
        validateBillSite: function () {
            var vm = this;

            if (vm.bill.site == '') {
                vm.bill.hasSiteError = true;
                $('.token-input-list').addClass("input-error");
            } else {
                vm.bill.hasSiteError = false;
                $('.token-input-list').removeClass("input-error");
            }
        },
        validateBillerType: function () {
            var vm = this;

            if (vm.bill.billerType == '') {
                vm.bill.hasBillerTypeError = true;
            } else {
                vm.bill.hasBillerTypeError = false;
            }
        },
        validateBillSupplier: function () {
            var vm = this;

            if (vm.bill.supplier == '') {
                vm.bill.hasSupplierError = true;
            } else {
                vm.bill.hasSupplierError = false;
            }
        },
        validateBillBuyer: function () {
            var vm = this;

            if (vm.bill.buyer == '') {
                vm.bill.hasBuyerError = true;
            } else {
                vm.bill.hasBuyerError = false;
            }
        },
        addItem: function (metadata) {
            var vm = this;

            var index = vm.bill.metadata.indexOf(metadata);
            var copy = Vue.util.extend({}, metadata);

            if (index === vm.bill.metadata.length) {
                vm.bill.metadata.push(copy);
            }
            else {
                vm.bill.metadata.splice(index + 1, 0, copy);
            }

            vm.calulateTotalCharge();
            vm.calculateTotalAmountDue();
        },
        removeItem: function (index) {
            var vm = this;

            vm.bill.metadata.splice(index, 1);

            vm.calulateTotalCharge();
            vm.calculateTotalAmountDue();
        },
        onlyForCurrency : function ($event, price) {
            //console.log($event.keyCode); //keyCodes value
            let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
       
            // only allow number and one dot
            if ((keyCode < 48 || keyCode > 57) && (keyCode !== 46 || price.indexOf('.') != -1)) { // 46 is dot
                $event.preventDefault();
            }
        },
        autoCalculate : function (item) {
            var vm = this;


            item.total = item.quantity * item.price;

            vm.calulateTotalCharge();
            vm.calculateTotalAmountDue();
        },
        calulateTotalCharge: function () {
            var vm = this;

            var notMandatoryLineItems = _.filter(vm.bill.metadata, { 'mandatory': false });

            var totalCharge = _.sumBy(notMandatoryLineItems, function (o) { return o.total; });

            for (var i = 0; i < vm.bill.metadata.length; i++) {
                if (vm.bill.metadata[i].name === "TotalCharge") {
                    vm.bill.metadata[i].total = totalCharge;
                    break;
                }
            }
        },
        calculateTotalAmountDue: function () {
            var vm = this;

            var totalChargeLineItems = _.filter(vm.bill.metadata, { 'mandatory': true, 'name': 'TotalCharge' });

            var totalAmountDue = _.sumBy(totalChargeLineItems, function (o) { return o.total; });

            for (var i = 0; i < vm.bill.metadata.length; i++) {
                if (vm.bill.metadata[i].name === "TotalAmountDue") {
                    vm.bill.metadata[i].total = totalAmountDue;
                    break;
                }
            }
        },
        preFillForm: function () {
            var vm = this;

            var date = new Date();
            var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
            var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
            var nextMonthLastDay = new Date(date.getFullYear(), date.getMonth() + 2, 0);
            var nextNextMonthLastDay = new Date(date.getFullYear(), date.getMonth() + 3, 0);

            var tLocale = "en-us";
            var t1Month = firstDay.toLocaleString(tLocale, { month: "short" });
            var t2Month = nextMonthLastDay.toLocaleString(tLocale, { month: "short" });
            var t3Month = nextNextMonthLastDay.toLocaleString(tLocale, { month: "short" });

            var ddFrom = firstDay.getDate();
            var yyyyFrom = firstDay.getFullYear();

            var ddTo = lastDay.getDate();
            var yyyyTo = lastDay.getFullYear();

            var isd1 = nextMonthLastDay.getDate();
            var isd3 = nextMonthLastDay.getFullYear();

            var dd1 = nextNextMonthLastDay.getDate();
            var dd3 = nextNextMonthLastDay.getFullYear();

            var from = ddFrom + ' ' + t1Month + ' ' + yyyyFrom;
            var to = ddTo + ' ' + t1Month + ' ' + yyyyTo;
            var issueDate = isd1 + ' ' + t2Month + ' ' + isd3;
            var dueDate = dd1 + ' ' + t3Month + ' ' + dd3;

            vm.bill.site = 'Cnr La Trobe St &, Swanston St, Melbourne VIC 3000';
            vm.bill.billerType = billerTypes[3].value;
            vm.bill.supplier = suppliers[0].value;
            vm.bill.buyer = buyers[0].value;
            vm.bill.accountNumber = 'Acc-0000000001';
            vm.bill.invoiceNumber = "Inv-0000000001";
            vm.bill.issueDate = issueDate;
            vm.bill.dueDate = dueDate;
            vm.bill.startDate = from;
            vm.bill.endDate = to;
            vm.bill.abn = "51 824 753 556";

			let color = "Black";
			let size = "L";
			let product = "";
			let name = "Clothing";
            for (var i = 0; i < vm.bill.metadata.length; i++) {
                vm.bill.metadata[i].startDate = from;
                vm.bill.metadata[i].endDate = to;

				if (i === 0)
				{
					color = "Pink";
					size = "S";
					product = "T-Shirt (" + size + " size) - Color " + color;
					name = "Clothing";
				} 
				else if (i === 1)
				{
					color = "Orange"
					size = "M";
					product = "Rice (" + size + " size)";
					name = "Food";
				}
				else if (i === 2)
				{
					color = "Orange"
					size = "M";
					product = "T-Shirt (" + size + " size) - Color " + color;
					name = "Food";
				}
				else if (i === 3)
				{
					color = "Purple";
					size = "S";
					name = "Food";
					product = "Noodles (" + size + " size)";
				}
				else {
					color = "Purple";
					size = "L";
					name = "Beverages";
					product = "Mineral Water (" + size + " size)";
				}

                if (!vm.bill.metadata[i].mandatory) {
                    vm.bill.metadata[i].name = name;
                    vm.bill.metadata[i].product = product;
                    vm.bill.metadata[i].quantity = 10;
                    vm.bill.metadata[i].price = 2.5;
                    vm.bill.metadata[i].total = vm.bill.metadata[i].quantity * vm.bill.metadata[i].price;
                }

                if (vm.bill.metadata[i].mandatory && vm.bill.metadata[i].name === "GST") {
                    vm.bill.metadata[i].total = 55;
                }
            }

            vm.calulateTotalCharge();
            vm.calculateTotalAmountDue();

            vm.validateBillSite();
            vm.validateBillerType();
            vm.validateBillSupplier();
            vm.validateBillBuyer();
        },
        exportToPdf: function () {
            var vm = this;

            //var doc = new jsPDF();
            var doc = window.jspdf.jsPDF();

			doc.addFileToVFS("https://github.com/daniel-yap-aeiou/sample-invoice-app/blob/master/assets/fonts/chinese-traditional.TTF", window.chinesetraditional);
			doc.addFont('https://github.com/daniel-yap-aeiou/sample-invoice-app/blob/master/assets/fonts/chinese-traditional.TTF', 'chinese-traditional', 'normal');

			doc.setFont('chinese-traditional', 'normal');

			// var xhr = new XMLHttpRequest();
			// //12f525c880a52f5a3d85c27ac71266a5.woff
			// xhr.open('GET', `../fonts/12f525c880a52f5a3d85c27ac71266a5.woff`, true);
			// xhr.responseType = 'arraybuffer';

			// xhr.onload = function (e) {
			  // if (this.status == 200) {
				 // doc.registerFont('chinesetraditional', xhr.response);
			  // }
			// }


			// doc.setFont('chinesetraditional', 'normal');

            var imgData = "data:image/png;base64,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t7S0fCASifzXtLHwWiaTEXw611xDWJB87ROJRKtlWX3eoUBEyxzH+Zm5w4MzZ0HyY0AI8XlE3OkZEp+SUn6Ph4jZBFiQU4Kcj4gpImpS78FyHGe72UODs1cEWBAeB0zgDARYEB4eTIAF4THABPQI8Ayix42jDCHAghhSaE5TjwALoseNowwhwIIYUmhOU48AC6LHjaMMIcCCGFJoTlOPAAuix42jDCHAghhSaE5TjwALoseNowwhwIIYUmhOU48AC6LHjaMMIcCCGFJoTlOPAAuix42jDCHAghhSaE5TjwALoseNowwhwIIYUmhOU48AC6LHjaMMIcCCGFJoTlOPAAuix42jDCHAghhSaE5TjwALoseNowwhwIIYUmhOU48AC6LHjaMMIcCCGFJoTlOPAAuix42jDCHAghhSaE5TjwALoseNowwhwIIYUmhOU48AC6LHjaMMIcCCGFJoTlOPAAuix42jDCHAghhSaE5TjwALoseNowwhwIIYUmhOU48AC6LHjaMMIcCCGFJoTlOPAAuix42jDCHAghhSaE5TjwALoseNowwhwIIYUmhOU48AC6LHjaMMIcCCGFJoTlOPAAuix42jDCHAghhSaE5TjwALoseNowwhwIIYUmhOU48AC6LHjaMMIcCCGFJoTlOPAAuix42jDCHAghhSaE5TjwALoseNowwh8P9ARRpB7qrcNAAAAABJRU5ErkJggg==";

            doc.setFontSize(15);
            doc.text(20, 20, 'Your invoice');
            doc.addImage(imgData, 'png', 20, 0, 20, 20);

            doc.setFontSize(10);
            doc.text(20, 30, 'Bill To Address: ' + vm.bill.site);

            doc.text(20, 40, 'Biller Type: ' + vm.bill.billerType);
            doc.text(20, 50, 'Supplier/Distributor: ' + vm.bill.supplier);
            doc.text(20, 60, 'Customer: ' + vm.bill.buyer);

            doc.text(20, 80, 'Account Number: ' + vm.bill.accountNumber);
            doc.text(20, 90, 'Invoice Number: ' + vm.bill.invoiceNumber);

            doc.text(20, 100, 'Issue Date: ' + vm.bill.issueDate);
            doc.text(20, 110, 'Due Date: ' + vm.bill.dueDate);
            //doc.text(20, 120, 'Start Date: ' + vm.bill.startDate);
            //doc.text(20, 130, 'End Date: ' + vm.bill.endDate);
            doc.text(20, 140, 'ABN: ' + vm.bill.abn);

            doc.addPage();

            var columns = [
                //{ title: "Start Date", dataKey: "startDate" },
                //{ title: "End Date", dataKey: "endDate" },
                { title: "Name", dataKey: "name" },
                { title: "Product", dataKey: "product" },
                { title: "Quantity", dataKey: "quantity" },
                { title: "Price", dataKey: "price" },
                { title: "Total", dataKey: "total" },
            ];
            var rows = [];

            for (var i = 0; i < vm.bill.metadata.length; i++) {
                rows.push({
                    //"startDate": vm.bill.metadata[i].startDate,
                    //"endDate": vm.bill.metadata[i].endDate,
                    "name": vm.bill.metadata[i].name,
                    "product": vm.bill.metadata[i].product,
                    "quantity": vm.bill.metadata[i].quantity,
                    "price": vm.bill.metadata[i].price,
                    "total": '$ ' + vm.bill.metadata[i].total,
                });
            }

            doc.setFontSize(10);
            doc.text(15, 10, 'Item(s)');

            doc.autoTable({
                theme: 'grid',
                headStyles: { fillColor: [10, 186, 181] }, // Tifanny blue
                columnStyles: {font: 'chinese-traditional'},
                margin: { top: 15 },
                body: rows,
				columns: columns,
            });


            var date = moment(new Date()).format('DD-MMM-YYYY HH:mm:ss');
            var id = nav.$data.id && nav.$data.id.length > 0 ? "_" + nav.$data.id : "";
            var filename = "invoice_" + date + id + ".pdf";

            doc.save(filename);
        },
        getAddressData: function (addressData, placeResultData, id) {
            var vm = this;

            vm.address = addressData;
        },
		toggleDirection : function () {
			var vm = this;
			
			
			let htmlEl=document.querySelector("#app");
			let dir = htmlEl.getAttribute('dir');
			
			if (dir === 'rtl')
			{
				htmlEl.setAttribute('dir','ltr');
			}
			else {
				htmlEl.setAttribute('dir','rtl');
			}
			
			return true;
		},
    }
});
