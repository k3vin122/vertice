//------------------------------------------------------------------------------
// <auto-generated>
//     Este código se generó a partir de una plantilla.
//
//     Los cambios manuales en este archivo pueden causar un comportamiento inesperado de la aplicación.
//     Los cambios manuales en este archivo se sobrescribirán si se regenera el código.
// </auto-generated>
//------------------------------------------------------------------------------

namespace proyectooo.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Alojamiento
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Alojamiento()
        {
            this.Alojamiento_has_servicio_adicional = new HashSet<Alojamiento_has_servicio_adicional>();
            this.Alojamiento_has_tipo_alojamineto = new HashSet<Alojamiento_has_tipo_alojamineto>();
            this.Programa_has_alojamiento = new HashSet<Programa_has_alojamiento>();
        }
    
        public int Id { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Alojamiento_has_servicio_adicional> Alojamiento_has_servicio_adicional { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Alojamiento_has_tipo_alojamineto> Alojamiento_has_tipo_alojamineto { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Programa_has_alojamiento> Programa_has_alojamiento { get; set; }
    }
}