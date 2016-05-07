/*jslint browser:true, white:true*/
(function () {

  'use strict';

  var containerCalc = m.q('div.container__calc');
  var inputArray = m.apsc(m.qa('input'));
  var selectArray = m.apsc(m.qa('select'));
  var spanArray = m.apsc(m.qa('span'));
  var calcButton = m.q('button.calculate-it');

  // user input values
  var monthly_mortgage_payment = m.q('#monthly_mortgage_payment').value;
  var years_left = m.q('#years_left').value;
  var annual_maintenance_fees = m.q('#annual_maintenance_fees').value;
  var annual_maintenance_increase = (m.q('#annual_maintenance_increase').value / 100);
  // console.log(monthly_mortgage_payment, years_left, annual_maintenance_fees, annual_maintenance_increase);

  // calculated values
  var mortgage_paid_in_full = m.q('#mortgage_paid_in_full');
  var year_ten_maintenance_fee = m.q('#year_ten_maintenance_fee');
  var total_maintenance_fees = m.q('#total_maintenance_fees');
  var ten_year_maintenance_fee_average = m.q('#ten_year_maintenance_fee_average');
  var cost_per_vacation = m.q('#cost_per_vacation');
  var total_cost_of_timeshare = m.q('#total_cost_of_timeshare');

  var updateCalculations;
  updateCalculations = function () {
    // Always times money calculations by 100, because
    // JavaScript sucks at decimals, and people like money
    // calculations to be accurate.
    mortgage_paid_in_full.textContent = (((monthly_mortgage_payment * 100 * 12) * years_left) / 100);


    /*
      A	Year 10 Maintenance Fee	((Annual Maintenance Fee)*(1+Int Rate)^9)
      B	Total Maintenance Fees - 10 years	((AMF)*(1+Int Rate)^9)+((AMF)*(1+Int Rate)^8)+((AMF)*(1+Int Rate)^7)+((AMF)*(1+Int Rate)^6)+((AMF)*(1+Int Rate)^5)+((AMF)*(1+Int Rate)^4+((AMF)*(1+Int Rate)^3)+((AMF)*(1+Int Rate)^2)+((AMF)*(1+Int Rate)^1))+AMF
      C	10 Year Maintenance Fee Average	B / 10
      D	Cost per Vacation	C + ((Mortgage paid in full) / Years Left)
      E	Total Cost of Timeshare	B + (Mortgage paid in full)
		*/

    var year_ten_maint_calc;
    year_ten_maint_calc = function () {
      var final_maintenance_fee = 0;
      final_maintenance_fee = (parseFloat(annual_maintenance_fees) * Math.pow((1 + annual_maintenance_increase), 9));
      year_ten_maintenance_fee.textContent = final_maintenance_fee;
      console.log(final_maintenance_fee);
    };
    year_ten_maint_calc();

  };

  var forceTwoDecimals;
  forceTwoDecimals = function () {
    inputArray.map(function (i) {
      i.value = parseFloat(i.value).toFixed(2);
    });
    spanArray.map(function (i) {
      i.textContent = parseFloat(i.textContent).toFixed(2);
    });
  };

  inputArray.map(function (i) {
    m.ael(i, 'change', function () {
      updateCalculations();
      forceTwoDecimals();
    });
  });
  selectArray.map(function (i) {
    m.ael(i, 'change', function () {
      updateCalculations();
      forceTwoDecimals();
    });
  });
  spanArray.map(function (i) {
    m.ael(i, 'change', function () {
      updateCalculations();
      forceTwoDecimals();
    });
  });

  m.ael(m.d, 'DOMContentLoaded', function () {
    updateCalculations();
    forceTwoDecimals();
  });

  m.ael(calcButton, 'click', function () {
    updateCalculations();
    forceTwoDecimals();
  });

}());
