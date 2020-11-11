package net.kooksdoes;

import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.noClasses;

import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ClassFileImporter;
import com.tngtech.archunit.core.importer.ImportOption;
import org.junit.jupiter.api.Test;

class ArchTest {

    @Test
    void servicesAndRepositoriesShouldNotDependOnWebLayer() {
        JavaClasses importedClasses = new ClassFileImporter()
            .withImportOption(ImportOption.Predefined.DO_NOT_INCLUDE_TESTS)
            .importPackages("net.kooksdoes");

        noClasses()
            .that()
            .resideInAnyPackage("net.kooksdoes.service..")
            .or()
            .resideInAnyPackage("net.kooksdoes.repository..")
            .should()
            .dependOnClassesThat()
            .resideInAnyPackage("..net.kooksdoes.web..")
            .because("Services and repositories should not depend on web layer")
            .check(importedClasses);
    }
}
