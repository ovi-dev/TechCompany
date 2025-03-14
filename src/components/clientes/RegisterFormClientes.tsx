'use client';
import { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { FaUser, FaPhone, FaMapMarkerAlt, FaGlobe, FaFileUpload, FaBriefcase } from "react-icons/fa";

// Definición de la interfaz para los datos del formulario
interface ClientFormData {
  firstName: string;
  lastName: string;
  cif: string;
  phone: string;
  address: string;
  country: string;
  province: string;
  municipality: string;
  postalCode: string;
  language: string;
  file: FileList;
}

const RegisterFormClientes = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string>("");

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ClientFormData>({
    mode: "onBlur",
    defaultValues: {
      country: "España", // Valor predeterminado para país
      language: "", // No preseleccionamos idioma
    }
  });

  const onSubmit: SubmitHandler<ClientFormData> = async (data) => {
    setIsSubmitting(true);
    try {
      // Simulamos una llamada a API
      console.log("Datos del cliente:", data);
      
      // Aquí iría tu lógica real de envío a la API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mostrar éxito y limpiar formulario
      setSubmitSuccess(true);
      reset();
      setSelectedFileName("");
      
      // Ocultar mensaje de éxito después de 5 segundos
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      console.error("Error al registrar cliente:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFileName(e.target.files[0].name);
    } else {
      setSelectedFileName("");
    }
  };

  return (
    <div className="flex items-center justify-center mt-10 bg-gradient-to-r p-2">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Registro de Cliente
        </h2>

        {submitSuccess && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
            ¡Cliente registrado con éxito!
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Dividimos el formulario en secciones */}
          <fieldset className="border rounded-md p-4 mb-4">
            <legend className="text-sm font-medium px-2">Información personal</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Nombre */}
              <div>
                <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">
                  Nombre <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <FaUser className="text-gray-500" />
                  </span>
                  <input
                    id="firstName"
                    {...register("firstName", { 
                      required: "El nombre es obligatorio",
                      minLength: {
                        value: 2,
                        message: "El nombre debe tener al menos 2 caracteres"
                      }
                    })}
                    className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.firstName ? "border-red-500" : ""
                    }`}
                    placeholder="Nombre"
                    aria-invalid={errors.firstName ? "true" : "false"}
                  />
                </div>
                {errors.firstName && (
                  <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>
                )}
              </div>

              {/* Apellido */}
              <div>
                <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">
                  Apellido <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <FaUser className="text-gray-500" />
                  </span>
                  <input
                    id="lastName"
                    {...register("lastName", { 
                      required: "El apellido es obligatorio",
                      minLength: {
                        value: 2,
                        message: "El apellido debe tener al menos 2 caracteres"
                      }
                    })}
                    className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.lastName ? "border-red-500" : ""
                    }`}
                    placeholder="Apellido"
                    aria-invalid={errors.lastName ? "true" : "false"}
                  />
                </div>
                {errors.lastName && (
                  <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>
                )}
              </div>

              {/* CIF */}
              <div>
                <label htmlFor="cif" className="block text-gray-700 text-sm font-bold mb-2">
                  CIF/NIF <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <FaBriefcase className="text-gray-500" />
                  </span>
                  <input
                    id="cif"
                    {...register("cif", { 
                      required: "El CIF/NIF es obligatorio",
                      pattern: {
                        value: /^[A-Z0-9]{9}$/i,
                        message: "Formato de CIF/NIF inválido"
                      }
                    })}
                    className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.cif ? "border-red-500" : ""
                    }`}
                    placeholder="B12345678"
                    aria-invalid={errors.cif ? "true" : "false"}
                  />
                </div>
                {errors.cif && (
                  <p className="text-red-500 text-xs mt-1">{errors.cif.message}</p>
                )}
              </div>

              {/* Teléfono */}
              <div>
                <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">
                  Teléfono <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <FaPhone className="text-gray-500" />
                  </span>
                  <input
                    id="phone"
                    {...register("phone", {
                      required: "El teléfono es obligatorio",
                      pattern: {
                        value: /^[0-9]{9,}$/,
                        message: "Introduzca un número de teléfono válido"
                      }
                    })}
                    className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.phone ? "border-red-500" : ""
                    }`}
                    placeholder="612345678"
                    aria-invalid={errors.phone ? "true" : "false"}
                  />
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
                )}
              </div>
            </div>
          </fieldset>

          <fieldset className="border rounded-md p-4 mb-4">
            <legend className="text-sm font-medium px-2">Dirección</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Dirección */}
              <div className="md:col-span-2">
                <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">
                  Dirección <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <FaMapMarkerAlt className="text-gray-500" />
                  </span>
                  <input
                    id="address"
                    {...register("address", { required: "La dirección es obligatoria" })}
                    className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.address ? "border-red-500" : ""
                    }`}
                    placeholder="Calle, número, piso, etc."
                    aria-invalid={errors.address ? "true" : "false"}
                  />
                </div>
                {errors.address && (
                  <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>
                )}
              </div>

              {/* País */}
              <div>
                <label htmlFor="country" className="block text-gray-700 text-sm font-bold mb-2">
                  País <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <FaGlobe className="text-gray-500" />
                  </span>
                  <select
                    id="country"
                    {...register("country", { required: "El país es obligatorio" })}
                    className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.country ? "border-red-500" : ""
                    }`}
                    aria-invalid={errors.country ? "true" : "false"}
                  >
                    <option value="">Selecciona un país</option>
                    <option value="España">España</option>
                    <option value="Portugal">Portugal</option>
                    <option value="Francia">Francia</option>
                    <option value="Alemania">Alemania</option>
                    <option value="Italia">Italia</option>
                  </select>
                </div>
                {errors.country && (
                  <p className="text-red-500 text-xs mt-1">{errors.country.message}</p>
                )}
              </div>

              {/* Provincia */}
              <div>
                <label htmlFor="province" className="block text-gray-700 text-sm font-bold mb-2">
                  Provincia <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <FaMapMarkerAlt className="text-gray-500" />
                  </span>
                  <input
                    id="province"
                    {...register("province", { required: "La provincia es obligatoria" })}
                    className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.province ? "border-red-500" : ""
                    }`}
                    placeholder="Barcelona"
                    aria-invalid={errors.province ? "true" : "false"}
                  />
                </div>
                {errors.province && (
                  <p className="text-red-500 text-xs mt-1">{errors.province.message}</p>
                )}
              </div>

              {/* Municipio */}
              <div>
                <label htmlFor="municipality" className="block text-gray-700 text-sm font-bold mb-2">
                  Municipio <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <FaMapMarkerAlt className="text-gray-500" />
                  </span>
                  <input
                    id="municipality"
                    {...register("municipality", { required: "El municipio es obligatorio" })}
                    className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.municipality ? "border-red-500" : ""
                    }`}
                    placeholder="Barcelona"
                    aria-invalid={errors.municipality ? "true" : "false"}
                  />
                </div>
                {errors.municipality && (
                  <p className="text-red-500 text-xs mt-1">{errors.municipality.message}</p>
                )}
              </div>

              {/* Código Postal */}
              <div>
                <label htmlFor="postalCode" className="block text-gray-700 text-sm font-bold mb-2">
                  Código Postal <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <FaMapMarkerAlt className="text-gray-500" />
                  </span>
                  <input
                    id="postalCode"
                    {...register("postalCode", {
                      required: "El código postal es obligatorio",
                      pattern: {
                        value: /^[0-9]{5}$/,
                        message: "El código postal debe tener 5 dígitos"
                      }
                    })}
                    className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.postalCode ? "border-red-500" : ""
                    }`}
                    placeholder="08001"
                    maxLength={5}
                    aria-invalid={errors.postalCode ? "true" : "false"}
                  />
                </div>
                {errors.postalCode && (
                  <p className="text-red-500 text-xs mt-1">{errors.postalCode.message}</p>
                )}
              </div>
            </div>
          </fieldset>

          <fieldset className="border rounded-md p-4 mb-4">
            <legend className="text-sm font-medium px-2">Preferencias y documentación</legend>
            
            {/* Idioma */}
            <div className="mb-4">
              <label htmlFor="language" className="block text-gray-700 text-sm font-bold mb-2">
                Idioma de comunicación <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <FaGlobe className="text-gray-500" />
                </span>
                <Controller
                  name="language"
                  control={control}
                  rules={{ required: "El idioma es obligatorio" }}
                  render={({ field }) => (
                    <select
                      id="language"
                      {...field}
                      className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.language ? "border-red-500" : ""
                      }`}
                      aria-invalid={errors.language ? "true" : "false"}
                    >
                      <option value="">Selecciona un idioma</option>
                      <option value="es">Español</option>
                      <option value="ca">Catalán</option>
                      <option value="en">Inglés</option>
                      <option value="fr">Francés</option>
                      <option value="de">Alemán</option>
                    </select>
                  )}
                />
              </div>
              {errors.language && (
                <p className="text-red-500 text-xs mt-1">{errors.language.message}</p>
              )}
            </div>

            {/* Subir Archivo */}
            <div className="mb-4">
              <label htmlFor="file" className="block text-gray-700 text-sm font-bold mb-2">
                Documentación <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className={`flex items-center border rounded-lg ${
                  errors.file ? "border-red-500" : "border-gray-300"
                }`}>
                  <label htmlFor="file" className="flex-shrink-0 px-4 py-2 bg-gray-100 text-gray-700 rounded-l-lg hover:bg-gray-200 cursor-pointer transition">
                    <FaFileUpload className="inline mr-2" /> Seleccionar archivo
                  </label>
                  <span className="px-4 py-2 truncate text-gray-500 flex-grow">
                    {selectedFileName || "Ningún archivo seleccionado"}
                  </span>
                  <input
                    id="file"
                    type="file"
                    {...register("file", { 
                      required: "El archivo es obligatorio",
                      onChange: handleFileChange
                    })}
                    className="sr-only"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    aria-invalid={errors.file ? "true" : "false"}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Formatos permitidos: PDF, DOC, DOCX, JPG, JPEG, PNG. Máximo 5MB.
                </p>
              </div>
              {errors.file && (
                <p className="text-red-500 text-xs mt-1">{errors.file.message}</p>
              )}
            </div>
          </fieldset>

          {/* Botón de Envío */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full ${
              isSubmitting ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
            } text-white py-3 px-4 rounded-lg transition duration-300 font-medium flex justify-center items-center`}
          >
            {isSubmitting ? "Procesando..." : "Registrar Cliente"}
          </button>
          
          <p className="text-gray-500 text-xs text-center mt-3">
            Los campos marcados con <span className="text-red-500">*</span> son obligatorios
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterFormClientes;