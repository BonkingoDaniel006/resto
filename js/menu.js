
        const carte = [
            // ENTRÉES
            { cat: "entrée", nom: "Os à Moelle", desc: "Grillé à la fleur de sel.", prix: "9€", img: "https://images.unsplash.com/photo-1598511757337-fe2af9359ba4?q=80&w=400", tags: ["Sans Gluten"] },
            { cat: "entrée", nom: "Croquettes Crevettes", desc: "Spécialité du Nord croustillante.", prix: "11€", img: "https://images.unsplash.com/photo-1541529086526-db283c563270?q=80&w=400", tags: [] },
            { cat: "entrée", nom: "Velouté Coco-Potiron", desc: "Douceur et exotisme.", prix: "8€", img: "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?q=80&w=400", tags: ["Végé", "Sans Gluten"] },
            { cat: "entrée", nom: "Tartare Thon-Piment", desc: "Thon rouge et piment oiseau.", prix: "12€", img: "https://images.unsplash.com/photo-1546039907-7fa05f864c02?q=80&w=400", tags: ["Épicé"] },
            { cat: "entrée", nom: "Poireaux Brûlés", desc: "Vinaigrette et parmesan.", prix: "7€", img: "https://images.unsplash.com/photo-1621259182978-f09e5e2ca84a?q=80&w=400", tags: ["Végé"] },

            // PLATS
            { cat: "plat", nom: "Carbonnade Flamande", desc: "Mijotée à la bière brune.", prix: "19€", img: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?q=80&w=400", tags: [] },
            { cat: "plat", nom: "Le Welsh Royal", desc: "Cheddar, jambon et œuf miroir.", prix: "17€", img: "https://images.unsplash.com/photo-1550507992-eb63ffee0847?q=80&w=400", tags: [] },
            { cat: "plat", nom: "Poulet Curry Fusion", desc: "Saveurs d'Asie et du Nord.", prix: "18€", img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=400", tags: ["Épicé"] },
            { cat: "plat", nom: "Risotto Truffe", desc: "Champignons et huile de truffe.", prix: "16€", img: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?q=80&w=400", tags: ["Végé"] },
            { cat: "plat", nom: "Potjevleesch", desc: "4 viandes blanches en gelée.", prix: "17€", img: "https://images.unsplash.com/photo-1606131731446-5568d87113aa?q=80&w=400", tags: [] },
            { cat: "plat", nom: "Saumon Miso", desc: "Laqué et purée de panais.", prix: "21€", img: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=400", tags: ["Sans Gluten"] },
            { cat: "plat", nom: "Burger Maroilles", desc: "Bœuf et fromage puissant.", prix: "18€", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=400", tags: [] },
            { cat: "plat", nom: "Chou-Fleur Rôti", desc: "Épices et houmous.", prix: "15€", img: "https://images.unsplash.com/photo-1621259182978-f09e5e2ca84a?q=80&w=400", tags: ["Végé", "Épicé"] },

            // DESSERTS
            { cat: "dessert", nom: "Merveilleux Spéculoos", desc: "Meringue et crème légère.", prix: "8€", img: "https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=400", tags: ["Végé"] },
            { cat: "dessert", nom: "Tarte au Sucre", desc: "Tradition flamande.", prix: "7€", img: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?q=80&w=400", tags: ["Végé"] },
            { cat: "dessert", nom: "Mousse Choco-Piment", desc: "Noir 70% et Espelette.", prix: "8€", img: "https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?q=80&w=400", tags: ["Végé", "Épicé"] },
            { cat: "dessert", nom: "Fruits Exotiques", desc: "Fraîcheur mangue-ananas.", prix: "7€", img: "https://images.unsplash.com/photo-1490818387583-1baba5e638af?q=80&w=400", tags: ["Végé", "Sans Gluten"] },

            // BOISSONS
            { cat: "boisson", nom: "Triple du Nord", desc: "Bière artisanale locale.", prix: "6€", img: "https://images.unsplash.com/photo-1535958636474-b021ee887b13?q=80&w=400", tags: [] },
            { cat: "boisson", nom: "Limonade Maison", desc: "Citron et basilic.", prix: "5€", img: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=400", tags: ["Végé"] },
            { cat: "boisson", nom: "Vin Rouge", desc: "Sélection St-Emilion.", prix: "7€/v", img: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=400", tags: ["Sans Gluten"] }
        ];

        function filterMenu(categorie) {
            const container = document.getElementById('menu-grid');
            container.innerHTML = '';
            
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.toggle('active', btn.innerText.toLowerCase().includes(categorie) || (categorie === 'tous' && btn.innerText === 'Tous'));
            });

            const items = categorie === 'tous' ? carte : carte.filter(p => p.cat === categorie);

            items.forEach(p => {
                const tagsHtml = p.tags.map(t => `<span class="tag ${t.toLowerCase() === 'végé' ? 'vege' : t.toLowerCase() === 'sans gluten' ? 'gf' : 'spicy'}">${t}</span>`).join('');
                
                container.innerHTML += `
                    <div class="menu-card">
                        <div class="card-img-wrapper">
                            <img src="${p.img}" alt="${p.nom}">
                        </div>
                        <div class="card-content">
                            <h3>${p.nom}</h3>
                            <div class="tags">${tagsHtml}</div>
                            <p>${p.desc}</p>
                            <span class="price">${p.prix}</span>
                        </div>
                    </div>
                `;
            });
        }

        window.onload = () => filterMenu('tous');
