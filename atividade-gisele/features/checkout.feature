Feature: Finalização de compra no Sauce Demo

    Scenario: Finalizar compra com dados válidos
    Given que existe um produto no carrinho
    When eu inicio a finalização da compra
    And preencho os dados obrigatórios corretamente
    And confirmo a finalização da compra
    Then devo visualizar a mensagem de compra concluída com sucesso


  Scenario: Validar campos obrigatórios do checkout
    Given que existe um produto no carrinho
    When eu inicio a finalização da compra
    And tento continuar sem preencher os dados obrigatórios
    Then devo visualizar uma mensagem de campo obrigatório


  Scenario: Cancelar a finalização da compra
    Given que existe um produto no carrinho
    When eu inicio a finalização da compra
    And cancelo a finalização da compra
