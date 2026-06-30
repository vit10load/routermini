# PostGIS

## Por que PostGIS?

O desafio exige persistência adequada das informações geográficas.

PostGIS permite armazenar e consultar dados espaciais dentro do PostgreSQL.

---

## Tipo utilizado

```text
geography(LineString,4326)
```

---

## Por que LineString?

Uma rota não é apenas um ponto.

Ela é uma sequência ordenada de coordenadas.

LineString representa exatamente isso.

---

## Por que geography?

`geography` é adequado para coordenadas reais da Terra usando latitude e longitude.

---

## Estrutura da rota

Além do campo espacial, a rota salva:

```text
points jsonb
```

Isso facilita reexibir a rota no frontend sem precisar recalcular tudo.

---

## Conversão

Pontos:

```json
[
  { "sequence": 1, "lat": -20.45, "lng": -54.61 },
  { "sequence": 2, "lat": -20.46, "lng": -54.62 }
]
```

Virando:

```text
LINESTRING(-54.61 -20.45, -54.62 -20.46)
```

Persistência:

```sql
ST_GeogFromText('LINESTRING(...)')
```

---

## Índice espacial

O projeto pode utilizar índice GIST para otimizar consultas espaciais.

---

## Melhorias futuras

- Buscar rotas próximas.
- Calcular distância espacial via banco.
- Filtrar rotas por região.
- Gerar estatísticas espaciais.
