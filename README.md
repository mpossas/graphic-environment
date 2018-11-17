# Manual de utilização do ambiente de implementação dos algoritmos de Computação Gráfica

    Para abrir o ambiente, clique com o botão direito no arquivo "index.html" >> Abrir com >> Google Chrome (ou selecione o navegador que você utiliza).

    Para selecionar um ponto no canvas, apenas clique em cima do ponto que deseja selecionar. Os algoritmos sempre levam em consideração os últimos dois pontos selecionados.

1) Rasterizacao de primitivas básicas
    1. Retas
        Para desenhar uma reta, selecione dois pontos, os vértices inicial e final da reta, respectivamente, e um dos algoritmos de rasterizacao de retas na aba "Retas", "DDA" ou "Bresenham", e em seguida clique no botão "Desenhar".
    2. Circunferências
        Para desenhar uma circunferência, selecione dois pontos, o primeiro será o centro da circunferência, e a distância entre o primeiro e o segundo será o raio da circunferência. Selecione na aba "Circunferências" a opção "Bresenham" e em seguida clique no botão "Desenhar".

2) Transformações Geométricas
    1. Translação
        Para transladar a última primitiva desenhada, indique nos campos "x" e "y" o vetor de translação e em seguida clique no botão "Translação".
    2. Escala
        Para alterar as dimensões da última primitiva desenhada, indique nos campos "x" e "y" o vetor de escala e em seguida clique no botão "Escala".
    3. Rotação
        Para rotacionar a última primitiva desenhada, indique no campo "θ" o valor do ângulo de rotação e em seguida clique no botão "Rotação".
    4. Reflexão
        Para refletir a última primitiva desenhada, selecione uma das opções de eixos e em seguida clique no botão "Reflexão".
    5. Cisalhamento
        Para aplicar uma força no sentido de um dos eixos, selecione uma das opções de eixos e indique no campo "f" o valor da força a ser aplicada. Em seguida, clique no botão "Cisalhamento".

3) Recorte 
    Clique em dois pontos, (Xmin, Ymin) e (Xmax, Ymax), respectivamente, para definir a janela de visualização, selecione um algoritmo de recorte e em seguida clique no botão "Recorte".

4) Preenchimento
    Escolha uma cor na paleta de cores, selecione um algoritmo de preenchimento, clique em um ponto interior à área de preenchimento e em seguida clique no botão "Colorir".

5) Curva de Bezier
    Selecione dois pontos de controle e desenhe uma reta, faça o mesmo para os outros dois pontos de controle, clique no botão "Bezier".