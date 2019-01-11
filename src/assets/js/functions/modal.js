  function modal_fuction() {

      $(function() {
          $("#myBtn").click(function() {
              $("#myModal").modal({ backdrop: "static" });
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
          });
      });



  }