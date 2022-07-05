class Observable {
	constructor(initialValue = null) {
		this._value = initialValue;
		this.subscribersQueue = {};
	}

	subscribe(listener) {
		const listenerId = Math.random().toString(36).substr(2, 9);
		this.subscribersQueue[listenerId] = listener;
		return () => delete this.subscribersQueue[listenerId];
	}

	get value() {
		return this._value;
	}

	set value(newValue) {
		this._value = newValue;
		this.notifySubscribers();
	}

	setProp(object, keys, val) {
		keys = Array.isArray(keys) ? keys : keys.split(".");
		if (keys.length > 1) {
			object[keys[0]] = object[keys[0]] || {};
			return this.setProp(object[keys[0]], keys.slice(1), val);
		}
		object[keys[0]] = val;
	}

	update(key, value) {
		this.setProp(this._value, key, value);
		this.notifySubscribers();
	}

	notifySubscribers() {
		for (const listenerId in this.subscribersQueue) {
			const listener = this.subscribersQueue[listenerId];
			listener(this.value);
		}
	}
}

class CalculatorInputs {
	renders = 0;

	constructor(calculator, types, sliders) {
		this.calculator = calculator;
		this.types = types;

		this.init(sliders);
	}

	init(sliders) {
		this.initTypesSelect(1);
		this.initData(1);
		this.initSliders(sliders);
		this.addListeners();
	}

	initTypesSelect(typeId) {
		$("select#type-alt").select2();
		$("select#type").select2();
		this.types.forEach((type) => {
			const newOption = new Option(type.name, type.id, false, false);
			$("select#type").append(newOption).trigger("change");
		});

		this.types.forEach((type) => {
			const newOption = new Option(type.name, type.id, false, false);
			$("select#type-alt").append(newOption).trigger("change");
		});

		const typeIndex = this.getTypeIndex(typeId);

		this.type = new Observable(this.types[typeIndex].id);
		$("select#type-alt").val(this.type.value).trigger("change");
		$("select#type").val(this.type.value).trigger("change");

		this.type.subscribe((value) => {
			this.updatedBy = "data";
			this.updateSlidersDataOnTypeSelect();
		});
	}

	initData(typeId) {
		const typeIndex = this.getTypeIndex(typeId);

		this.slidersData = new Observable({
			term: {
				current: Math.floor((this.types[typeIndex].term.min + this.types[typeIndex].term.max) / 2),
				min: this.types[typeIndex].term.min,
				max: this.types[typeIndex].term.max,
			},
			sum: {
				current: Math.floor((this.types[typeIndex].sum.min + this.types[typeIndex].sum.max) / 4),
				min: this.types[typeIndex].sum.min,
				max: this.types[typeIndex].sum.max,
			},
			sumHero: {
				current: Math.floor((this.types[typeIndex].sum.min + this.types[typeIndex].sum.max) / 4),
				min: this.types[typeIndex].sum.min,
				max: this.types[typeIndex].sum.max,
			},
			sumBank: {
				current: Math.floor((this.types[typeIndex].sum.min + this.types[typeIndex].sum.max) / 4),
				min: this.types[typeIndex].sum.min,
				max: this.types[typeIndex].sum.max,
			},
			sumInvest: {
				current: Math.floor((this.types[typeIndex].sum.min + this.types[typeIndex].sum.max) / 4),
				min: this.types[typeIndex].sum.min,
				max: this.types[typeIndex].sum.max,
			},
			stake: {
				current: this.types[typeIndex].stake.min,
				min: this.types[typeIndex].stake.min,
				max: this.types[typeIndex].stake.max,
			},
			square: {
				current: 40,
				min: 1,
				max: 200,
			},
		});

		this.slidersData.subscribe((value) => {
			if (this.updatedBy === "data" && this.renders === 0) {
				this.renders = 1;
				this.sliders.forEach((slider) => {
					this.updateSlider(slider.name);
				});
				this.calculator.update({
					term: this.slidersData.value.term.current,
					sum: this.slidersData.value.sum.current,
					stake: this.slidersData.value.stake.current,
				});
			} else if (this.updatedBy === "slider" && this.renders === 0) {
				this.renders = 1;
				this.calculator.update({
					term: this.slidersData.value.term.current,
					sum: this.slidersData.value.sum.current,
					stake: this.slidersData.value.stake.current,
				});
			}
			setTimeout(() => (this.renders = 0));
		});
	}

	initSliders(sliders) {
		const updatedBy = () => (this.updatedBy = "slider");
		const updateValue = (name, value) => {
			this.slidersData.update(`${name}.current`, value);
		};
		this.sliders = sliders.map((slider) => {
			const sliderEl = document.getElementById(slider.name);
			const sliderInput = $(`input[name="${slider.name}"]`);
			noUiSlider.create(sliderEl, {
				start: this.slidersData.value[slider.name].current,
				step: slider.step,
				connect: "lower",
				range: {
					min: this.slidersData.value[slider.name].min,
					max: this.slidersData.value[slider.name].max,
				},
			});
			if (sliderInput.attr("name").includes("sum")) {
				sliderInput.inputmask("9 999 999", {
					min: this.slidersData.value[slider.name].min,
					max: this.slidersData.value[slider.name].max,
				});
			} else {
				sliderInput.inputmask("decimal", {
					min: this.slidersData.value[slider.name].min,
					max: this.slidersData.value[slider.name].max,
				});
			}

			sliderInput.on("change", function () {
				updatedBy();
				sliderEl.noUiSlider.set(+$(this).val());
			});
			sliderEl.noUiSlider.on("update", function (values, handle) {
				updatedBy();
				sliderInput.val(slider.round(values[0]));
				updateValue(slider.name, slider.round(values[0]));
			});

			return {
				name: slider.name,
				el: sliderEl,
				input: sliderInput,
			};
		});
	}

	updateSlidersDataOnTypeSelect() {
		const data = {};
		const typeIndex = this.types.findIndex((t) => t.id == this.type.value);
		this.sliders.forEach((slider) => {
			let val = +$(`input[name=${slider.name}`).val();
			if (val > this.types[typeIndex][slider.name].max) val = this.types[typeIndex][slider.name].max;
			if (val < this.types[typeIndex][slider.name].min) val = this.types[typeIndex][slider.name].min;
			data[slider.name] = {
				current: val,
				min: this.types[typeIndex][slider.name].min,
				max: this.types[typeIndex][slider.name].max,
			};
		});
		this.slidersData.value = data;
	}

	updateSlider(name) {
		const slider = this.sliders.find((s) => s.name === name);
		slider.el.noUiSlider.updateOptions({
			start: this.slidersData.value[slider.name].current,
			range: {
				min: this.slidersData.value[slider.name].min,
				max: this.slidersData.value[slider.name].max,
			},
		});
		slider.input.val(this.slidersData.value[slider.name].current);
	}

	addListeners() {
		const type = this.type;
		$("select#type").on("select2:select", function (e) {
			type.value = e.params.data.id;
		});
		$("select#type-alt").on("select2:select", function (e) {
			type.value = e.params.data.id;
		});
	}

	getTypeIndex(typeId) {
		let typeIndex = this.types.findIndex((t) => t.id == typeId);
		if (typeIndex === -1) typeIndex = 0;

		return typeIndex;
	}
}

class Calculator {
	update(values) {
		this.term = values.term;
		this.sum = values.sum;
		this.stake = values.stake;

		const monthStake = this.stake / 12 / 100;
		this.payPerMonth = Math.round(
			this.sum * ((monthStake * Math.pow(1 + monthStake, this.term)) / (Math.pow(1 + monthStake, this.term) - 1)),
		);
		this.totalSum = this.payPerMonth * this.term;
		this.overpay = this.totalSum - this.sum;

		this.renderValues();
	}

	renderValues() {
		$("#payPerMonth").html(this.formatNumber(this.payPerMonth));
		$("#totalSum").html(this.formatNumber(this.totalSum));
		$("#overpay").html(this.formatNumber(this.overpay));
	}

	formatNumber(number) {
		return new Intl.NumberFormat("ru-RU").format(number);
	}

	getData() {
		return {
			term: this.term,
			sum: this.sum,
			stake: this.stake,
			payPerMonth: this.payPerMonth,
			totalSum: this.totalSum,
			overpay: this.overpay,
		};
	}
}

$(document).ready(function () {
	//calculator
	const types = [
		{
			id: 1,
			name: "Квартира",
			term: { min: 2, max: 360 },
			sum: { min: 300000, max: 57000000 },
			stake: { min: 15.1, max: 43 },
		},
		{
			id: 2,
			name: "Дом",
			term: { min: 2, max: 360 },
			sum: { min: 300000, max: 57000000 },
			stake: { min: 17, max: 43 },
		},
		{
			id: 3,
			name: "Дача",
			term: { min: 2, max: 360 },
			sum: { min: 300000, max: 57000000 },
			stake: { min: 18, max: 43 },
		},
		{
			id: 4,
			name: "Доля",
			term: { min: 2, max: 360 },
			sum: { min: 100000, max: 57000000 },
			stake: { min: 18, max: 43 },
		},
		{
			id: 5,
			name: "Коммерческая недвижимость",
			term: { min: 6, max: 360 },
			sum: { min: 500000, max: 57000000 },
			stake: { min: 18.5, max: 43 },
		},
	];

	const sliders = [
		{
			name: "term",
			current: 1,
			step: 1,
			round: (val) => Math.round(val),
		},
		{
			name: "sum",
			step: 10000,
			current: 100000,
			round: (val) => Math.round(val),
		},
		{
			name: "sumHero",
			step: 10000,
			current: 100000,
			round: (val) => Math.round(val),
		},
		{
			name: "sumBank",
			step: 10000,
			current: 100000,
			round: (val) => Math.round(val),
		},
		{
			name: "sumInvest",
			step: 10000,
			current: 100000,
			round: (val) => Math.round(val),
		},
		{
			name: "stake",
			step: 0.1,
			current: 15.1,
			round: (val) => Math.round(val * 10) / 10,
		},
		{
			name: "square",
			current: 40,
			step: 0.5,
			round: (val) => Math.round(val * 10) / 10,
		},
	];

	const calc = new Calculator();
	const inputs = new CalculatorInputs(calc, types, sliders);

	//calc graph (спизжено с другого сайта)
	// Расчет аннуитетного платежа
	function calcAnnuitet(money, year, stavka, toFixed) {
		if (typeof toFixed == "undefined") {
			toFixed = 1;
		}
		if (typeof stavka == "undefined") {
			var stavka = 9.3;
		}
		var n = year; // месяцев
		// Коэффициент аннуитета
		i = stavka / 12 / 100;
		k = (i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);
		Pmt = k * money;
		if (toFixed) {
			Pmt = Pmt.toFixed(0);
		}
		return Pmt;
	}
	function openGraphic() {
		const data = calc.getData();
		var stavka = data.stake;
		var money = data.sum;
		var moneyFull = money;
		var srok = data.term;
		var monthPay = calcAnnuitet(money, srok, stavka, 0);
		var trs = [];
		var maxVals = [0, 0, 0, 0, 0];
		for (var i = 1; i <= srok; i++) {
			k = stavka / 12 / 100;
			var percents = k * money;
			if (srok == i) {
				monthPay = money + percents;
			}
			var main = monthPay - percents;
			money -= main;
			trs.push([i, monthPay, percents, main, money]);
			maxVals[2] = Math.max(maxVals[2], percents);
			maxVals[3] = Math.max(maxVals[3], main);
			maxVals[4] = Math.max(maxVals[4], money);
		}
		var date = new Date();
		var tr = "<tr>";
		tr += "<td>" + date.toLocaleDateString() + "</td>";
		tr += "<td>0</td>";
		tr += "<td>0</td>";
		tr += "<td>0</td>";
		tr +=
			"<td>" + new Intl.NumberFormat("ru-RU").format(moneyFull, 2) + '₽. <span style="width:30%"></span></td>';
		tr += "</tr>";
		$(".table tbody").append(tr);
		date = dateAdd(date, {
			month: +1,
		});
		for (var i in trs) {
			var row = trs[i];
			var w1 = (30 * (row[2] / maxVals[2])).toFixed(2);
			var w2 = (30 * (row[3] / maxVals[3])).toFixed(2);
			var w3 = (30 * (row[4] / maxVals[4])).toFixed(2);
			if (typeof row[0] == "undefined") {
				continue;
			}
			var tr = "<tr>";
			tr += "<td>" + date.toLocaleDateString() + "</td>";
			tr +=
				"<td>" +
				new Intl.NumberFormat("ru-RU").format(row[3], 2) +
				' ₽. <span style="width:' +
				w2 +
				'%"></span></td>';
			tr +=
				"<td>" +
				new Intl.NumberFormat("ru-RU").format(row[2], 2) +
				' ₽. <span style="width:' +
				w1 +
				'%"></span></td>';
			tr += "<td>" + new Intl.NumberFormat("ru-RU").format(row[1], 2) + " ₽.</td>";
			tr +=
				"<td>" +
				new Intl.NumberFormat("ru-RU").format(row[4], 2) +
				' ₽. <span style="width:' +
				w3 +
				'%"></span></td>';
			tr += "</tr>";
			$(".table tbody").append(tr);
			date = dateAdd(date, {
				month: +1,
			});
		}

		// render data in popup header
		$("#sum1").text(new Intl.NumberFormat("ru-RU").format(data.sum));
		$("#term1").text(data.term);
		$("#stake1").text(data.stake);
	}
	function dateAdd(now, add) {
		let y = now.getFullYear(),
			m = now.getMonth(),
			d = now.getDate();
		if (add.month) {
			m += add.month;
		}
		if (add.year) {
			y += add.year;
		}
		if (add.date) {
			d += add.date;
		}
		let nowx = new Date(y, m, d);
		return nowx;
	}

	//popup
	$(".form-button--dark").click(function (e) {
		e.preventDefault();
		openGraphic();
		$(".layer").fadeIn(300);
		$(".calculator__popup").fadeIn(500);
		document.body.style.overflow = "hidden";
	});

	$(".layer").click(function (e) {
		if ($(this).has(e.target).length === 0) {
			$(".layer").fadeOut(300);
			$(".calculator__popup").fadeOut(300);
			document.body.style.overflow = "scroll";
			$(".table tbody").empty();
		}
	});

	$(".close").click(function () {
		$(".layer").fadeOut(300);
		$(".calculator__popup").fadeOut(300);
		document.body.style.overflow = "scroll";
		$(".table tbody").empty();
	});

	//mask
	$("input[name=phone]").inputmask("+9 (999) 999-9999");
});
