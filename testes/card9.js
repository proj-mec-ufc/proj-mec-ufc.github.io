// Elementos iteretivos
iterativeSVG('../conteudos/assets/svg/regua.svg', '#regua', () => {
    let group = SVG('g#marks');
    let balls = group.find('circle')
    let marks = group.children();
    //let text = SVG('text#texto');
    let count = 0;
    let step = 10;
    marks.each(m => {
        let c = m.findOne('circle');
        //console.log(element.attr('id'));
        c.css("opacity",'0');

        let txt = m.text(count);
        txt.x(c.x());
        txt.y(c.y());
        txt.css('font-size','4px');

        count += step;

        let r = m.findOne('rect');
        r.on("mouseover", (el) => {
            c.css("opacity",'1');              
        });

        r.on("mouseout", (el) => {
            c.css("opacity",'0');              
        });

        /* let txt = text.clone();
        txt.x(element.x());
        txt.y(element.y());
        element.parent().add(txt); */
        //group.add(txt);
        /* element.on("mouseover", (el) => {
            console.log(element.id());                
        }); */
    });

/*     marks.each((e,i) => {
        e.on("mouseover", (el) => {
            console.log(e.id());
            balls[i].css("opacity",'1');           
        });
        console.log(i);
    }); */
});