export function Footer() {
  return (
    <footer className="border-t mt-10">
      <div className="container mx-auto px-4 py-8 text-sm grid md:grid-cols-3 gap-6">
        <div>
          <div className="font-semibold mb-2">Repuestos</div>
          <p>Despacho a todo Chile. Compatibilidad por vehículo.</p>
        </div>
        <div>
          <div className="font-semibold mb-2">Ayuda</div>
          <ul className="space-y-1">
            <li>Devoluciones</li><li>Garantías</li><li>Despachos</li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-2">Contacto</div>
          <p>WhatsApp • Correo • Dirección</p>
        </div>
      </div>
    </footer>
  );
}
