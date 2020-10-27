$(document).ready(function(){

    //search or filter out
    $("#myInput").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $(".container div").filter(function() {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });
        
        console.log("Cargó");
        $("#elementos").empty();

    var pokedexpokemons = function(pokemones){
        //console.log(pokemones);
        pokemones.forEach(function(pokemon){
            var id = pokemon.entry_number;
            var imagen = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + id + ".png";
            var url = pokemon.pokemon_species.url;
            var name = pokemon.pokemon_species.name.charAt(0).toUpperCase() + pokemon.pokemon_species.name.slice(1);
            $("#elementos").append(monster(name, url, imagen, id));
        })
    }
    
    
    var monster = function(name, url, imagen,id){
        var t = "<div class='cont-pokemon' data-id='"+id+"'><div class='elemento'>" + name + "</div><img class='img-pkmn' src='" + imagen + "' alt='imagen-pokemon'></div>" ;
        return t;
    }
    
    
    var ajaxPokemon = function(pokemon){
        $.ajax({
            url: 'https://pokeapi.co/api/v2/pokedex/1',
            type: 'GET',
            datatype: 'json',
        })
        .done(function(response){
            //console.log(response);
            pokedexpokemons(response.pokemon_entries);
            //Termina carga pokemones
        })
        .fail(function(error){
            console.log('Error');
        });
    }

    ajaxPokemon();
    

    $(document).on("click", '.cont-pokemon', function(event) { 
        console.log("Info pokemon");

        var poke = function(pokemones){
            //console.log(pokemones);

                var name = pokemones.name.charAt(0).toUpperCase() + pokemones.name.slice(1);
                var id = pokemones.id;
                var imagen = pokemones.sprites.front_default;
                var hp = pokemones.stats[5].base_stat;
                var attack = pokemones.stats[4].base_stat;
                var defense = pokemones.stats[3].base_stat;
                var specialAttack = pokemones.stats[2].base_stat;
                var specialDefense = pokemones.stats[1].base_stat;
                var speed = pokemones.stats[0].base_stat;
                $("#elementos").remove();
                $("#elementos-pkm").append(pokedexpokemons2(name, id, imagen, speed, specialDefense, specialAttack, defense, attack, hp));
                $(".back").click(function(){window.location.reload(true);});
            }

        var pokedexpokemons2 = function(name, id, imagen, hp, attack, defense, specialAttack, specialDefense, speed){
            var t = "<div class='info-pokemon'><div class='names-pkmn'>" + name + "</div><div class='numb-pkmn'>#" + id + "</div><img class='specific-info' src='"
            + imagen + "' alt='pokemon'><div class='cont-h3'><h3>Profile</h3></div><br><div class='container-info-p'><span class='info-p'>Health Points: " + hp + "</span><br><span class='info-p'>Attack Damage: " 
            + attack + "</span><br><span class='info-p'>Defense: " + defense
            + "</span><br><span class='info-p'>Special Attack: " + specialAttack+ "</span><br><span class='info-p'>Special Defense: " 
            + specialDefense + "</span><br><span class='info-p'>Speed: " + speed + "</span></div><br><center><button class='back' >Back</button></center></div>" ;
            return t;
        }
        
        var ajaxPokemon2 = function(pokemon_id){
            $.ajax({
                url: 'https://pokeapi.co/api/v2/pokemon/'+ pokemon_id,
                type: 'GET',
                datatype: 'json',
            })
            .done(function(response){
                //console.log(response);
                poke(response);
            })
            .fail(function(error){
                console.log('Error');
                swal("Error!", "Try again");
            });
        }

        ajaxPokemon2($(this).data('id'));

    });
})



