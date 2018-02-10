(function () {
    function makeAjaxCall(url, methodType, callback) {
       jQuery.ajax({
          url: url,
          method: methodType,
          dataType: "json",
          success: callback,
          error: function (reason, xhr) {
             console.log("error in processing your request", reason);
          }
       })
    }
    // git hub url to get btford details
    //&page=2";

    $('#btn_search').on('click', function () {

        if($('#search_term').val() == ''){

            jQuery("#error_msg").html('Please enter search term!');
            return;
        }
        
       jQuery("#error_msg").html('');
       jQuery("#searching").html('Searching.....');
       jQuery("#project_row").html('');

       var URL = "https://api.github.com/search/repositories?q=";

       URL = URL + $('#search_term').val() + "&per_page=10";
       console.log(URL);

       // return 1;
       makeAjaxCall(URL, "GET", function (respJson) {

          $('#results').html('').append('<strong>Results: ' + respJson.total_count + '</strong>');
          $('#pagination').html('');
          $("#searching").html('');
          //  return 1;
          console.log(respJson);
          var per_page = 10;
          //return 1;
          var total_links_count = parseInt(respJson.total_count / per_page);

          if (respJson.total_count % per_page > 1) {
             total_links_count++;
          }

          console.log(parseInt(respJson.total_count / per_page) + ' ' + respJson.total_count % per_page);

          $.each(respJson.items, function (index, repo) {
             var project_info = `<div class="col-md-6">
               <div class="card flex-md-row mb-4 box-shadow h-md-250">
                <div class="card-body d-flex flex-column align-items-start">
                 <strong class="d-inline-block mb-2 text-primary">${repo.owner.login} 
                     </strong>

                  <h3 class="mb-0" style="word-wrap: break-word;overflow-wrap: break-word; width:320px">
                            <a class="text-dark" href="#">${repo.full_name}</a>              
                 </h3>
                 <div style="color:black" class="mb-1">
                   <i style="color: #63b763;" class="fa fa-default fa-star"></i> ${repo.stargazers_count}
                   <i class="fa  fa-code-fork"></i> ${repo.forks_count}
                   <i style="color:orange" class="fa fa-code"></i> ${repo.language}
                 </div>
                 <strong>Description: </strong>
                 <p class="card-text mb-auto">${(repo.description)? repo.description : 'No description found!'}</p>
                 <a href="${repo.owner.html_url}" target="_blank">Visit Page</a>
               </div>
               <img class="card-img-right flex-auto d-none d-md-block"
               alt="Thumbnail [250x250]" style="width: 250px; height: 250px;" 
                   src="${repo.owner.avatar_url}"
                data-holder-rendered="true">
             </div>
           </div> `;

             jQuery("#project_row").append(project_info);
             //        return userInfo;
          });


          var res = URL.split("per_page");
          console.log(res[0]);


          for (var i = 0; i < total_links_count; i++) {
             $('.pagination').append(
                $('<button>').attr('href', res[0] + 'page=' + (i + 1) + '&per_page=10').attr('class', 'page-link').append(
                   (i + 1)
                ));
          }



          return;
       });


    }); // end of on-click




    $("#pagination").delegate("button", 'click', function (event) {

       $("#searching").html('Loading...');
       jQuery("#project_row").html('');

       var URL = $(this).attr('href');

       console.log(URL);

       event.preventDefault();


       makeAjaxCall(URL, "GET", function (respJson) {
          $("#searching").html('');


          //  return 1;
          console.log(respJson);
          //             return 1;

          $.each(respJson.items, function (index, repo) {
             var project_info = `<div class="col-md-6">
                                   <div class="card flex-md-row mb-4 box-shadow h-md-250">
                                     <div class="card-body d-flex flex-column align-items-start">
                                       <strong class="d-inline-block mb-2 text-primary">${repo.owner.login} 
                                           </strong>

                                        <h3 class="mb-0" style="word-wrap: break-word;overflow-wrap: break-word; width:320px">

                                         <a class="text-dark" href="#">${repo.full_name}</a>              
                                       </h3>
                                       <div style="color:black" class="mb-1">
                                         <i style="color: #63b763;" class="fa fa-default fa-star"></i> ${repo.stargazers_count}
                                         <i class="fa  fa-code-fork"></i> ${repo.forks_count}
                                         <i style="color:orange" class="fa fa-code"></i> ${repo.language}
                                       </div>
                                       <strong>Description: </strong>
                                       <p class="card-text mb-auto">${(repo.description)? repo.description : 'No description found!'}</p>
                                       <a href="${repo.owner.html_url}" target="_blank">Visit Page</a>
                                     </div>
                                     <img class="card-img-right flex-auto d-none d-md-block"
                                     alt="Thumbnail [250x250]" style="width: 250px; height: 250px;" 
                                         src="${repo.owner.avatar_url}"
                                      data-holder-rendered="true">
                                   </div>
                                 </div> `;

             jQuery("#project_row").append(project_info);
             //        return userInfo;
          });

          return;
       });


    }); // end of on-click



 })();