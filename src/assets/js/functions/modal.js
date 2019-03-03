  function modal_fuction() {

      $(function() {
          $("#myBtn").click(function() {
              $("#myModal").modal({ backdrop: "static" });
              $("#subAccount").val(0);
          });
      });

      $(function() {
          $("#bankBtn").click(function() {
              $("#bankModal").modal({ backdrop: "static" });

          });
      });

      $(function() {
          $("#bankAcc").click(function() {
              $("#bankAccModal").modal({ backdrop: "static" });
              $("#dataList").val(0);
          });
      });

      $(function() {
          $("#supplierMod").click(function() {
              $("#suppModal").modal({ backdrop: "static" });
              $("#supplierList").val(0);
              $("#customerList").val(0);

          });
      });

      $(function() {
          $(document).ready(function() {
              $("#dataList").val(0);
          });
      });



      // MAterial Date picker
      jQuery('.mydatepicker, #datepicker').datepicker();
      jQuery('#datepicker-autoclose').datepicker({
          autoclose: true,
          todayHighlight: true
      });


  }